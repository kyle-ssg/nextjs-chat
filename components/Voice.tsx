import React, {FunctionComponent, useEffect, useState} from 'react';
import Project from "../common/project";
import {func} from "prop-types";
import {IAgoraRTCClient} from "agora-rtc-sdk-ng";
import _data from "../common/_data";
import useAuth from "../common/useAuth";

let resolved = false;
let client;
let promise;


const rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
};

function getClient(): IAgoraRTCClient{
    const AgoraRTC = require("agora-rtc-sdk-ng")
    rtc.client = rtc.client || AgoraRTC.createClient({ mode: "rtc", codec: "h264" })
    return rtc.client
}


async function join() {
    /**
     * Put the following code snippets here.
     */
}


type ComponentType = {
    room: string
}

const Voice: FunctionComponent<ComponentType> = ({room}) => {
    const [audioStream, setInputAudioStream] = useState<MediaStream>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {user:loggedInUser} = useAuth();
    const leave = async function (){
        try {
            const client = getClient();

            // Destroy the local audio and video tracks.
            rtc.localAudioTrack?.close();
            rtc.localVideoTrack?.close();

            // Traverse all remote users.
            rtc.client.remoteUsers.forEach(user => {
                // Destroy the dynamically created DIV container.
                const playerContainer = document.getElementById(`${user.uid}`);
                playerContainer && playerContainer.remove();
            });
            await client.leave();
        }catch (e){}
    }
    const joinChannel = async ()=>{
        if (!loggedInUser) {
            return
        }
        const AgoraRTC = require("agora-rtc-sdk-ng")

        setIsLoading(true)
        const client = getClient();
        await leave();
        const {token} = await _data.post(`${Project.api}agora`, {room})
        const uid = await client.join(Project.agora, room, token, loggedInUser.username);
        // Create an audio track from the audio sampled by a microphone.
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a video track from the video captured by a camera.
        // rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        // Publish the local audio and video tracks to the channel.
        await client.publish(rtc.localVideoTrack ? [rtc.localAudioTrack, rtc.localVideoTrack] : [rtc.localAudioTrack]);
        client.on("user-published", async (user, mediaType) => {
            // Subscribe to a remote user.
            await client.subscribe(user, mediaType);

            // If the subscribed track is video.
            if (mediaType === "video") {
                // Get `RemoteVideoTrack` in the `user` object.
                const remoteVideoTrack = user.videoTrack;
                // Dynamically create a container in the form of a DIV element for playing the remote video track.
                const playerContainer = document.createElement("div");
                // Specify the ID of the DIV container. You can use the `uid` of the remote user.
                playerContainer.id = user.uid.toString();
                playerContainer.style.width = "640px";
                playerContainer.style.height = "480px";
                document.body.append(playerContainer);

                // Play the remote video track.
                // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                remoteVideoTrack.play(playerContainer);

                // Or just pass the ID of the DIV container.
                // remoteVideoTrack.play(playerContainer.id);
            }

            // If the subscribed track is audio.
            if (mediaType === "audio") {
                // Get `RemoteAudioTrack` in the `user` object.
                const remoteAudioTrack = user.audioTrack;
                // Play the audio track. No need to pass any DOM element.
                remoteAudioTrack.play();
            }
        });

        client.on("user-unpublished", user => {
            // Get the dynamically created DIV container.
            const playerContainer = document.getElementById(`${user.uid}`);
            // Destroy the container.
            if(!playerContainer) {
                debugger
            }
            playerContainer.remove();
        });
    }

    useEffect(()=>{
        joinChannel().then(r => {});
    },[room, loggedInUser?._id]);

    useEffect(()=>{
        return leave;
    },[])
    return (
        <>

        </>
    )
}

export default Voice
