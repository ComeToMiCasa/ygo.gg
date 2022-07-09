import React, { useState } from "react";

const GameSelector = ({
    label,
    isWin,
    isFirst,
    setIsWin,
    setIsFirst,
    isInValid,
}) => (
    <div style={{ display: "flex" }}>
        <b style={{ color: isInValid ? "gray" : "black" }}>{label}</b>
        <WinOrLose
            isChecked={isWin}
            handleCheck={setIsWin}
            isDisabled={isInValid}
        />
        <WhoGoesFirst
            isChecked={isFirst}
            handleCheck={setIsFirst}
            isDisabled={isInValid}
        />
    </div>
);

const WinOrLose = ({ isChecked, handleCheck, isDisabled }) => (
    <div style={{ width: 90 }}>
        <input
            type={"radio"}
            checked={isChecked}
            onChange={() => handleCheck(true)}
            disabled={isDisabled}
        />
        <label>승</label>
        <input
            type={"radio"}
            checked={!isChecked}
            onChange={() => handleCheck(false)}
            disabled={isDisabled}
        />
        <label>패</label>
    </div>
);

const WhoGoesFirst = ({ isChecked, handleCheck, isDisabled }) => (
    <div style={{ width: 90 }}>
        <input
            type={"radio"}
            checked={isChecked}
            onChange={() => handleCheck(true)}
            disabled={isDisabled}
        />
        <label>선</label>
        <input
            type={"radio"}
            checked={!isChecked}
            onChange={() => handleCheck(false)}
            disabled={isDisabled}
        />
        <label>후</label>
    </div>
);

export default GameSelector;
