import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, interval, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  CallInfoDialogComponent,
  DialogData,
} from '../call-info-dialog/call-info-dialog.component';
import { Socket } from 'ngx-socket-io';
import { v4 as uuidv4 } from 'uuid';
import  * as Peer from 'peerjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userId: string;
  name: string;
  customerNo: string;
}

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit, OnDestroy {


  constructor(
    public dialog: MatDialog,
    // private socket: Socket,
    private dialogRef: MatDialogRef<VideoChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private eventEmitterService: EventEmitterService
  ) {}

  peer: Peer.Peer = new Peer.Peer;
  currentUserId: string = uuidv4();
  currentUser: string = '';
  currentUserName: string = '';
  currentUserNo: string = '';
  videos: VideoElement[] = [];
  roomId!: string;
  isCallStarted: boolean = false;
  modalView: string = 'maximized';
  settingMode: boolean = false;
  infoMode: boolean = false;

  mediaCall!: Peer.MediaConnection;
  mediaCall2!: Peer.MediaConnection;

  isScreenShare: boolean = false;
  isVideo: boolean = true;
  isAudio: boolean = true;
  isChatActive: boolean = false;
  message: any;
  user: any;
  unreadcount: any = 0;

  editsendbutton: any = true;

  public audioDeviceId = '';
  public videoDeviceId = '';
  public currentStream!: MediaStream;

  private responseobserve!: Subscription;
  public intervallTimer = interval(1000);

  audioInput: any[] = [];
  videoInput: any[] = [];
  audioOutput: any[] = [];

  messagelist: any = [];
  alluserdetails: any = [];
  T_N: any = '';
  selectedbroker: any = [];
  ptname: any;
  Transaction_Type: any;
  selectedptid: any;
  selectedppid: any;
  id: any
  lastname: any
  firstname: any



  ngOnInit(): void {

    this.id = this.userService.getDecodedAccessToken(
      localStorage.getItem('token')!
    ).id;
    this.lastname = this.userService.getDecodedAccessToken(
      localStorage.getItem('token')!
    ).lastname;
    this.firstname = this.userService.getDecodedAccessToken(
      localStorage.getItem('token')!
    ).firstname;
    this.responseobserve = this.intervallTimer.subscribe(() =>
      this.getUnreadChat()
    );

    this.get_chat(this.data.chat_data);

    console.log('user id', this.id);

    console.log('data from product', this.data);

    let that = this;
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {
          if (device.kind == 'audioinput' && device.deviceId.length > 15) {
            that.audioInput.push({
              label: device.label,
              value: device.deviceId,
            });
          } else if (device.kind == 'videoinput') {
            that.videoInput.push({
              label: device.label,
              value: device.deviceId,
            });
          } else {
            // console.log("device kind", device.kind);
          }
        });
      })
      .catch(function (err) {
        // console.log(err.name + ": " + err.message);
      });

    const { _id, customerno, firstname, lastname } = JSON.parse(
      localStorage.getItem('currentUser')!
    );
    this.currentUser = _id;
    this.currentUserName = firstname + lastname;
    this.currentUserNo = customerno;
  }

  get_chat(video_chat_data: any): void {
    let user = video_chat_data.user;

    this.user = user;

    let ppid = user.ppid;
    let ptid = user.ptid;
    if (user.Transaction_Type == 'Registrierung Produktpartner') {
      ppid = '';
      ptid = '';
    }
    this.message = {
      broker_id: video_chat_data.broker_id,
      case_no: user.Activity_No,
      ptid: ptid,
      ppid: ppid,
    };

    console.log('video chat data', video_chat_data);
    console.log('message details', this.message);

    this.userService.getchatmessage(this.message).subscribe(
      (success: any) => {
        console.log('Chat ka data', success);
        this.messagelist = success.result;
        this.userService
          .getbrokerbyuser_id(user.employ_ids)
          .subscribe((fidresult: any) => {
            this.alluserdetails = fidresult;
            this.T_N = user.Activity_No;
            this.selectedbroker = user.employ_ids;
            this.ptname = user.ptname;
            this.Transaction_Type = user.Transaction_Type;
            this.selectedptid = user.ptid;
            this.selectedppid = user.ppid;
          });
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  getUnreadChat() {
    let message = {
      broker_id: this.data.chat_data.broker_id,
      case_no: this.data.chat_data.user.Activity_No,
    };

    console.log('case no in video chat', this.data.chat_data.user.Activity_No);
    this.userService.getchatunreadmessage(message).subscribe(
      (success: any) => {
        console.log('unread chat data', success);
        for (let i = 0; i < success.result.length; i++) {
          if (
            this.messagelist.findIndex(
              (x: any) => x._id == success.result[i]._id
            ) == -1
          ) {
            this.messagelist.push(success.result[i]);
          }
        }
      },
      (err) => {
        console.log('error5');
        console.log(err);
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.destroyPeer();
    this.responseobserve.unsubscribe();
  }

  public makeCall(roomId: any) {
    this.peer = new Peer.Peer(this.currentUserId);

    this.peer.on('open', (userId) => {
      // this.socket.emit('join-room', roomId, userId);
    });

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .catch((err) => {
        console.error('[Error] Not able to retrieve user media:', err);
        return null;
      })
      .then((stream: MediaStream | null) => {
        this.currentStream = stream!;
        if (stream) {
          this.addMyVideo(stream);
        }
        this.isCallStarted = true;
        this.peer.on('call', (call) => {
          // console.log("receiving call...", call);

          this.mediaCall = call;

          this.mediaCall.answer(stream!);

          this.mediaCall.on('stream', (otherUserVideoStream: MediaStream) => {
            // console.log("receiving other stream", otherUserVideoStream);

            this.addOtherUserVideo(
              this.mediaCall.metadata.userId,
              this.mediaCall.metadata.name,
              this.mediaCall.metadata.customerNo,
              otherUserVideoStream
            );
          });

          this.mediaCall.on('error', (err) => {
            console.error(err);
          });
        });

        // this.socket.on('user-connected', (userId: any) => {
        //   setTimeout(() => {
        //     this.mediaCall2 = this.peer.call(userId, stream!, {
        //       metadata: {
        //         userId: this.currentUserId,
        //         name: this.currentUserName,
        //         currentUserNo: this.currentUserNo,
        //       },
        //     });
        //     this.mediaCall2.on(
        //       'stream',
        //       (otherUserVideoStream: MediaStream) => {
        //         // console.log("receiving other user stream after his connection");
        //         this.addOtherUserVideo(
        //           userId,
        //           this.currentUserName,
        //           this.currentUserNo,
        //           otherUserVideoStream
        //         );
        //       }
        //     );

        //     this.mediaCall2.on('close', () => {
        //       this.onCallClose();
        //       this.videos = this.videos.filter(
        //         (video) => video.userId !== userId
        //       );
        //     });
        //   }, 1000);
        // });
      });

    // this.socket.on('user-disconnected', (userId: any) => {
    //   // console.log(`receiving user-disconnected event from ${userId}`);
    //   this.videos = this.videos.filter((video) => video.userId !== userId);
    // });
  }

  public receiveCall(roomId: any) {
    this.peer = new Peer.Peer(this.currentUserId);
    // this.peer = this.peer;
    this.roomId = roomId;
    this.peer.on('open', (userId) => {
      // this.socket.emit('join-room', roomId, userId);
    });

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .catch((err) => {
        console.error('[Error] Not able to retrieve user media:', err);
        return null;
      })
      .then((stream: MediaStream | null) => {
        this.currentStream = stream!;
        if (stream) {
          this.addMyVideo(stream);
        }

        this.peer.on('call', (call) => {
          // console.log("receiving call...", call);

          this.mediaCall = call;

          this.mediaCall.answer(stream!);

          this.mediaCall.on('stream', (otherUserVideoStream: MediaStream) => {
            // console.log("receiving other stream", otherUserVideoStream);
            this.isCallStarted = true;
            this.addOtherUserVideo(
              this.mediaCall.metadata.userId,
              this.mediaCall.metadata.name,
              this.mediaCall.metadata.customerNo,
              otherUserVideoStream
            );
          });

          this.mediaCall.on('error', (err) => {
            console.error(err);
          });
        });

        // this.socket.on('user-connected', (userId: any) => {
        //   // console.log("Receiving user-connected event", `Calling ${userId}`);

        //   // Let some time for new peers to be able to answer
        //   setTimeout(() => {
        //     this.mediaCall2 = this.peer.call(userId, stream!, {
        //       metadata: {
        //         userId: this.currentUserId,
        //         name: this.currentUserName,
        //         currentUserNo: this.currentUserNo,
        //       },
        //     });
        //     this.mediaCall2.on(
        //       'stream',
        //       (otherUserVideoStream: MediaStream) => {
        //         // console.log("receiving other user stream after his connection");
        //         this.addOtherUserVideo(
        //           userId,
        //           this.currentUserName,
        //           this.currentUserNo,
        //           otherUserVideoStream
        //         );
        //       }
        //     );

        //     this.mediaCall2.on('close', () => {
        //       this.onCallClose();
        //       this.videos = this.videos.filter(
        //         (video) => video.userId !== userId
        //       );
        //     });
        //   }, 1000);
        // });
      });

    // this.socket.on('user-disconnected', (userId: any) => {
    //   // console.log(`receiving user-disconnected event from ${userId}`);
    //   this.videos = this.videos.filter((video) => video.userId !== userId);
    // });

  }

  addMyVideo(stream: MediaStream) {
    this.videos.push({
      muted: false,
      srcObject: stream,
      userId: this.currentUserId,
      name: this.currentUserName,
      customerNo: this.currentUserNo,
    });
  }

  addOtherUserVideo(
    userId: string,
    name: string,
    customerNo: string,
    stream: MediaStream
  ) {
    const alreadyExisting = this.videos.some(
      (video) => video.userId === userId
    );
    if (alreadyExisting) {
      // console.log(this.videos, userId);
      return;
    }
    this.videos.push({
      muted: false,
      srcObject: stream,
      userId,
      name,
      customerNo,
    });
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }

  public showModal(joinCall: boolean) {
    let dialogData: DialogData = joinCall
      ? { peerId: '', joinCall: true }
      : { peerId: this.roomId, joinCall: false };
    const dialogRef = this.dialog.open(CallInfoDialogComponent, {
      width: '400px',
      data: dialogData,
      hasBackdrop: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((peerId) =>
          joinCall
            ? of(this.receiveCall(peerId))
            : of(this.makeCall(this.roomId))
        )
      )
      .subscribe((_) => {});
  }

  public startCall() {
    this.roomId = uuidv4();
    this.showModal(false);
  }

  audioInputChange(event: any) {
    this.audioDeviceId = event.target.value;
    let id = event.target.value;
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

  videoInputChange(event: any) {
    this.videoDeviceId = event.target.value;
    let id = event.target.value;
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

  videoStatus() {
    const videoTrack = this.currentStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    this.isVideo = !this.isVideo;
  }

  audioStatus() {
    const audioTrack = this.currentStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    this.isAudio = !this.isAudio;
  }

  startScreenShare() {
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({ video: true })
      .then((myStream: any) => {
        this.currentStream.getTracks().forEach((track) => {
          if (track.kind == 'video') {
            track.stop();
            this.currentStream.removeTrack(track);
          }
        });
        myStream.getTracks().forEach((track: any) => {
          this.currentStream.addTrack(track);
        });

        Object.values(this.peer.connections).forEach((connections) => {
          // @ts-ignore
          connections.forEach((connection) => {
            connection.peerConnection.getSenders().forEach((sender: any) => {
              if (sender.track.kind == 'video') {
                const newVideoTrack = this.currentStream.getVideoTracks()[0];
                sender.replaceTrack(newVideoTrack);
              }
            });
          });
        });
      });
    this.isScreenShare = true;
  }

  stopScreenShare() {
    // this.callService.stopScreenShare();
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
            connection.peerConnection.getSenders().forEach((sender: any) => {
              sender.replaceTrack(this.currentStream.getVideoTracks()[0]);
              sender.replaceTrack(this.currentStream.getAudioTracks()[0]);
            });
          });
        });
      });
    this.isScreenShare = false;
  }

  public destroyPeer() {
    this.mediaCall?.close();
    this.mediaCall2?.close();
    if (!this.mediaCall || !this.mediaCall2) {
      this.onCallClose();
    }
    this.peer?.disconnect();
    this.peer?.destroy();
    this.isCallStarted = false;
    this.roomId = '';
    this.videos = [];
  }

  public onCallClose() {
    this.videos.forEach((video) => {
      video.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    });
  }

  modalClose() {
    this.videos = [];
    this.mediaCall?.close();
    this.mediaCall2?.close();
    if (!this.mediaCall || !this.mediaCall2) {
      this.onCallClose();
    }
  }

  onMinimize() {
    this.modalView = 'minimized';
    this.dialogRef.updateSize('500px', '300px');
    this.eventEmitterService.unreadChatMessage();
    this.responseobserve.unsubscribe();
  }

  onMaximize() {
    this.modalView = 'maximized';
    this.dialogRef.updateSize('100%', '100%');
    this.eventEmitterService.unreadChatMessageClose();
    this.responseobserve = this.intervallTimer.subscribe(() =>
      this.getUnreadChat()
    );
  }

  onChatClick() {
    this.isChatActive = !this.isChatActive;
  }

  checkmessage() {
    // console.log("valuee", $("#inputmessage1").val());
    if ($('#inputmessage1').val() != '') {
      // console.log("returning value false");
      return false;
    }
    // console.log("returning value true");
    return true;
  }

  sendmessage() {
    // $('#inputmessage').attr("disabled","true");
    $('#inputmessage1').attr('disabled', 'true');

    let inputmessage: any = $('#inputmessage1').val();

    // console.log("moveforward" + JSON.stringify(this.selectedbroker));
    let index = this.selectedbroker.indexOf(this.id);
    if (index != -1) {
      this.selectedbroker.splice(index, 1);
    }
    // console.log("moveforward" + JSON.stringify(this.selectedbroker));

    let newdata = {
      broker_id: this.selectedbroker,
      case_no: this.T_N,
      company_name: 'Cefima',
      message: inputmessage,
      CreatedBy: this.id,
      ptid: this.selectedptid,
      ppid: this.selectedppid,
    };

    console.log('new message data in video chat', newdata);

    this.userService.sendmessage(newdata).subscribe((result: any) => {
      // console.log("moveforward" + JSON.stringify(result));
      let data = {
        _id: result.result._id,
        company_name: result.result.company_name,
        case_no: result.result.case_no,
        message: result.result.message,
        type: result.result.type,
        question_id: result.result.question_id,
        ans: result.result.ans,
        mid: result.result.mid,
        createdAt: result.result.createdAt,
        userinfo: [
          {
            firstname: this.firstname,
            lastname: this.lastname,
          },
        ],
        specilistsinfo: [],
        ppinfo: [],
      };
      this.messagelist.push(data);
      $('#inputmessage1').removeAttr('disabled');
      this.editsendbutton = true;
      $('#inputmessage1').val('');
    });
    // console.log("before service function in video chat");

    console.log('user in video chat', this.user);
    this.eventEmitterService.onFirstComponentButtonClick(this.user);
    // console.log("After service function in video chat", this.user);
  }
}

