import {SyntheticEvent} from "react";

export default function safeEventParse(e?: SyntheticEvent){
    // safe attempt to parse form value
    if (!e) {
      return e;
    }
    if (!e.target) {
      return e;
    }

    const target = e.target as HTMLFormElement;

    if (target.getAttribute) {
      return target.type === "checkbox" || target.type === "radio"
        ? target.getAttribute("checked")
        : typeof target.value === "string"
          ? target.value
          : target.getAttribute("data-value") || target.getAttribute("value");
    }

    if (target && target.textContent) {
      return (e.target as HTMLElement).textContent;
    }
    return target ? target.value : e;
  }
