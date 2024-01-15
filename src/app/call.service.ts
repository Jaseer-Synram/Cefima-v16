import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import Peer from "peerjs";
import { BehaviorSubject, Subject } from "rxjs";
import { v4 as uuidv4 } from "uuid";

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userId: string;
}

@Injectable()
export class CallService {
  private peer: Peer;
  private mediaCall: Peer.MediaConnection;
  public currentStream: MediaStream;

  public audioDeviceId = "";
  public videoDeviceId = "";
  public myPeerId: string;

  public videos: VideoElement[] = [];

  private localStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(
    null
  );
  public localStream$ = this.localStreamBs.asObservable();
  private remoteStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(
    null
  );
  public remoteStream$ = this.remoteStreamBs.asObservable();

  private isCallStartedBs = new Subject<boolean>();
  public isCallStarted$ = this.isCallStartedBs.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  public initPeer(): string {
    if (!this.peer || this.peer.disconnected) {
      const peerJsOptions: Peer.PeerJSOption = {
        debug: 3,
        config: {
          iceServers: [
            {
              urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
              ],
            },
          ],
        },
      };
      try {
        let id = uuidv4();
        this.peer = new Peer(id, peerJsOptions);
        return id;
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async establishMediaCall(remotePeerId: string) {
    this.myPeerId = remotePeerId;
    let userId = uuidv4();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.currentStream = stream;

      if (this.videoDeviceId.length > 1) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              deviceId: { exact: this.videoDeviceId },
            },
          })
          .then((myStream) => {
            const existingVideoTrack = stream.getVideoTracks()[0];
            const newVideoTrack = myStream.getVideoTracks()[0];
            existingVideoTrack.stop();
            stream.removeTrack(existingVideoTrack);
            stream.addTrack(newVideoTrack);
          });
      }

      if (this.audioDeviceId.length > 1) {
        navigator.mediaDevices
          .getUserMedia({
            audio: { deviceId: { exact: this.audioDeviceId } },
          })
          .then((myStream) => {
            const existingAudioTrack = stream.getAudioTracks()[0];
            const newAudioTrack = myStream.getAudioTracks()[0];
            existingAudioTrack.stop();
            stream.removeTrack(existingAudioTrack);
            stream.addTrack(newAudioTrack);
          });
      }

      const connection = this.peer.connect(remotePeerId);

      connection.on("error", (err) => {
        console.error(err);
        this.snackBar.open(err, "Close");
      });

      this.mediaCall = this.peer.call(remotePeerId, stream);

      if (!this.mediaCall) {
        let errorMessage = "Unable to connect to remote peer";
        this.snackBar.open(errorMessage, "Close");
        throw new Error(errorMessage);
      }
      this.localStreamBs.next(stream);
      this.isCallStartedBs.next(true);

      this.mediaCall.on("stream", (remoteStream) => {
        this.addOtherUserVideo(userId, remoteStream);
        this.remoteStreamBs.next(remoteStream);
        console.log("all videos", this.videos);
      });

      this.mediaCall.on("error", (err) => {
        this.snackBar.open(err, "Close");
        console.error(err);
        this.isCallStartedBs.next(false);
      });
      this.mediaCall.on("close", () => this.onCallClose());
    } catch (ex) {
      console.error(ex);
      this.snackBar.open(ex, "Close");
      this.isCallStartedBs.next(false);
    }
  }

  public async enableCallAnswer() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.currentStream = stream;

      if (this.videoDeviceId.length > 1) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              deviceId: { exact: this.videoDeviceId },
            },
          })
          .then((myStream) => {
            const existingVideoTrack = stream.getVideoTracks()[0];
            const newVideoTrack = myStream.getVideoTracks()[0];
            existingVideoTrack.stop();
            stream.removeTrack(existingVideoTrack);
            stream.addTrack(newVideoTrack);
          });
      }

      if (this.audioDeviceId.length > 1) {
        navigator.mediaDevices
          .getUserMedia({
            audio: { deviceId: { exact: this.audioDeviceId } },
          })
          .then((myStream) => {
            const existingAudioTrack = stream.getAudioTracks()[0];
            const newAudioTrack = myStream.getAudioTracks()[0];
            existingAudioTrack.stop();
            stream.removeTrack(existingAudioTrack);
            stream.addTrack(newAudioTrack);
          });
      }

      this.localStreamBs.next(stream);
      this.peer.on("call", async (call) => {
        this.mediaCall = call;
        this.isCallStartedBs.next(true);

        this.mediaCall.answer(stream);

        let userId = uuidv4();
        this.mediaCall.on("stream", (remoteStream) => {
          this.addOtherUserVideo(userId, remoteStream);
          this.remoteStreamBs.next(remoteStream);
        });
        this.mediaCall.on("error", (err) => {
          this.snackBar.open(err, "Close");
          this.isCallStartedBs.next(false);
          console.error(err);
        });
        this.mediaCall.on("close", () => this.onCallClose());
      });
    } catch (ex) {
      console.error(ex);
      this.snackBar.open(ex, "Close");
      this.isCallStartedBs.next(false);
    }
  }

  private onCallClose() {
    this.remoteStreamBs?.value.getTracks().forEach((track) => {
      track.stop();
    });
    this.localStreamBs?.value.getTracks().forEach((track) => {
      track.stop();
    });
    this.snackBar.open("Call Ended", "Close");
  }

  public closeMediaCall() {
    this.mediaCall?.close();
    if (!this.mediaCall) {
      this.onCallClose();
    }
    this.isCallStartedBs.next(false);
  }

  public destroyPeer() {
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }

  addOtherUserVideo(userId: string, stream: MediaStream) {
    console.log("video function executed");

    const alreadyExisting = this.videos.some(
      (video) => video.userId === userId
    );
    if (alreadyExisting) {
      console.log(this.videos, userId);
      return;
    }
    this.videos.push({
      muted: false,
      srcObject: stream,
      userId,
    });
  }

  public async videoStatus() {
    console.log(
      "videos variable inside service",
      this.currentStream.getTracks()
    );
    const videoTrack = this.currentStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
  }

  public async audioStatus() {
    const audioTrack = this.currentStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
  }

  public videoInputChange(id: string) {
    if (id.length > 1) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: { exact: id },
          },
        })
        .then((myStream) => {
          this.currentStream = myStream;
          const existingVideoTrack = this.currentStream.getVideoTracks()[0];
          const newVideoTrack = myStream.getVideoTracks()[0];
          existingVideoTrack.stop();
          this.currentStream.removeTrack(existingVideoTrack);
          this.currentStream.addTrack(newVideoTrack);
        });
    }
  }

  public audioInputChange(id: string) {
    if (id.length > 1) {
      navigator.mediaDevices
        .getUserMedia({
          audio: { deviceId: { exact: id } },
        })
        .then((myStream) => {
          this.currentStream = myStream;
          const existingAudioTrack = this.currentStream.getAudioTracks()[0];
          const newAudioTrack = myStream.getAudioTracks()[0];
          existingAudioTrack.stop();
          this.currentStream.removeTrack(existingAudioTrack);
          this.currentStream.addTrack(newAudioTrack);
        });
    }
  }

  public startScreenShare() {
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({ video: true })
      .then((myStream) => {
        this.currentStream.getTracks().forEach((track) => {
          if (track.kind == "video") {
            track.stop();
            this.currentStream.removeTrack(track);
          }
        });
        myStream.getTracks().forEach((track) => {
          this.currentStream.addTrack(track);
        });

        Object.values(this.peer.connections).forEach((connections) => {
          // @ts-ignore
          connections.forEach((connection) => {
            connection.peerConnection.getSenders().forEach((sender) => {
              // if (sender.track.kind == "audio") {
              //   const newAudioTrack = this.currentStream.getAudioTracks()[0];
              //   sender.replaceTrack(newAudioTrack);
              // }
              if (sender.track.kind == "video") {
                const newVideoTrack = this.currentStream.getVideoTracks()[0];
                sender.replaceTrack(newVideoTrack);
              }
              // sender.replaceTrack(this.currentStream.getAudioTracks()[0]);
            });
          });
        });
      });
  }

  public stopScreenShare() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((myStream) => {
        this.currentStream.getTracks().forEach((track) => {
          track.stop();
          this.currentStream.removeTrack(track);
        });
        myStream.getTracks().forEach((track) => {
          this.currentStream.addTrack(track);
        });

        Object.values(this.peer.connections).forEach((connections) => {
          // @ts-ignore
          connections.forEach((connection) => {
            connection.peerConnection.getSenders().forEach((sender) => {
              sender.replaceTrack(this.currentStream.getVideoTracks()[0]);
              sender.replaceTrack(this.currentStream.getAudioTracks()[0]);
            });
          });
        });
      });
  }

  public onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
}
