import {IMessageBase} from "../models";
import {DEFAULT_AVATAR} from "./constants";

function bot (message:Partial<IMessageBase>):IMessageBase {
    return {
        username:"InfoBot",
        avatar:DEFAULT_AVATAR,
        messageType:"TEXT",
        localId: "",
        text:":).",
        ...message
    }
}

export default bot;
