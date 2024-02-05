import React from "react";

export interface IRefState {
  location: React.MutableRefObject<HTMLInputElement>,
  search: React.MutableRefObject<HTMLInputElement>,
}