import React, {
  useEffect,
  useState,
  useRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import Typography from "./Typography";
import Button from "./Button";
import styles from "@/styles/components/videoChat.module.css";

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxZTZlZmJjYi1mYmQyLTQwMmItYjQ5ZC0yN2RkMzFmN2NjZDciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNDI5NDY4NSwiZXhwIjoxNzM0ODk5NDg1fQ.4hOMKk0Kz3H17g2HNYN0XxFXYGH3rzpR62xNu3DKJek`;

type VideoCallControlsProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    onMeetingLeave?: () => void;
  }
>;

const VideoCallControls = ({ onMeetingLeave }: VideoCallControlsProps) => {
  const { leave, toggleMic, toggleWebcam, localWebcamOn, localMicOn } =
    useMeeting();

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <Button onClick={toggleMic}>
        {localMicOn ? "Mute Mic" : "Unmute Mic"}
      </Button>
      <Button onClick={toggleWebcam}>
        {localWebcamOn ? "Stop Video" : "Start Video"}
      </Button>
      <Button
        onClick={() => {
          leave();
          if (onMeetingLeave) onMeetingLeave();
        }}
      >
        Leave Call
      </Button>
    </div>
  );
};

type ParticipantViewProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    participantId: string;
    participant?: object;
  }
>;

const ParticipantView = ({ participantId }: ParticipantViewProps) => {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const videoStream = React.useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={participantId}>
      <div className={styles.row}>
        {displayName} |
        {webcamOn ? (
          <Image
            src={"/assets/icons/vid.png"}
            alt="webOn"
            height={16}
            width={16}
          />
        ) : (
          <Image
            src={"/assets/icons/vid-off.png"}
            alt="webOff"
            height={16}
            width={16}
          />
        )}{" "}
        |
        {micOn ? (
          <Image
            src={"/assets/icons/mic.png"}
            alt="micOn"
            height={16}
            width={16}
          />
        ) : (
          <Image
            src={"/assets/icons/mute.png"}
            alt="micOff"
            height={16}
            width={16}
          />
        )}
      </div>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"200px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

type MeetingViewProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    meetingId: string;
    onMeetingLeave: () => void;
  }
>;

const MeetingView = ({ meetingId, onMeetingLeave }: MeetingViewProps) => {
  const { participants, join, leave } = useMeeting({
    onMeetingJoined: () => console.log("Meeting Joined!"),
  });

  React.useEffect(() => {
    join();

    return () => {
      if (leave) leave();
    };
  }, []);

  return (
    <div className={styles.meetingView}>
      <div className={styles.row}>
        <Typography>Meeting ID: {meetingId}</Typography>
        <Image
          src={"/assets/icons/copy.png"}
          alt="copy"
          height={16}
          width={16}
          onClick={() => navigator.clipboard.writeText(meetingId)}
          style={{ cursor: "pointer" }}
        />
      </div>

      <VideoCallControls onMeetingLeave={onMeetingLeave} />

      <div
        className={styles.videoContainer}
      >
        {Array.from(participants.values()).map((participant) => (
          <ParticipantView
            key={participant.id}
            participantId={participant.id}
          />
        ))}
      </div>
    </div>
  );
};

type JoinScreenProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    getMeetingId: (meetingId: string | null) => void;
  }
>;

function JoinScreen({ getMeetingId }: JoinScreenProps) {
  const [meetingId, setMeetingId] = useState(null);

  const onClick = async () => {
    await getMeetingId(meetingId);
  };

  return (
    <div className={styles.joinScreenRoot}>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <Button onClick={onClick}>Join</Button>
      <Typography>or</Typography>
      <Button onClick={onClick}>Create Meeting</Button>
    </div>
  );
}

const VideoCall = () => {
  const [meetingId, setMeetingId] = useState("");

  // API call to create a meeting
  const createMeeting = async () => {
    try {
      const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
          authorization: `${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      //Destructuring the roomId from the response
      const { roomId } = await res.json();

      console.log("object", roomId);
      return roomId;
    } catch (e) {
      console.log(e);
    }
  };

  const getMeetingId = async (id: string | undefined | null) => {
    const _meetingId = !id ? await createMeeting() : id;
    setMeetingId(_meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId("");
  };

  return (
    <>
      {meetingId ? (
        <MeetingProvider
          config={{
            meetingId: meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "G Saha",
          }}
          token={TOKEN}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
      ) : (
        <JoinScreen getMeetingId={getMeetingId} />
      )}
    </>
  );
};

export default VideoCall;
