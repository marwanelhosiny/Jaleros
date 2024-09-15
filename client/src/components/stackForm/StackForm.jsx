import { t } from "i18next";
import React from "react";

function StackForm({
  // common
  directionBox = "row",
  stackType,
  label,
  error = false,
  // icon or src
  icon,
  src,
  onclickIcon,
  // input
  typeInput,
  idInput,
  placeholderInput,
  valueInput,
  onChangeInput,
  // select
  idselect,
  valueSelect,
  onChangeSelect,
  options = [],
  custom = false,
  fields = [],
  wantedForValue,
  wantedForDisplay,
  numberofFields = 3,
  symbols = true,
}) {
  return (
    <div className="stackform">
      <h1 className="label">
        {label && t(label)} {error && <span style={{ color: "red" }}>*</span>}
      </h1>
      <div
        className={`box ${error && "error"}`}
        style={{ display: "flex", flexDirection: directionBox }}
      >
        {stackType === "input" ? (
          <input
            type={typeInput || "text"}
            id={idInput}
            onChange={(e) => onChangeInput(e)}
            placeholder={placeholderInput}
            value={valueInput}
            style={{ flexGrow: 1 }}
          />
        ) : (
          <select
            name=""
            id={idselect}
            value={valueSelect}
            onChange={(e) => onChangeSelect(e)}
            style={{ flexGrow: 1 }}
          >
            {options.length > 0 &&
              options.map((item, i) => (
                <option value={item[wantedForValue]} key={i}>
                  {custom
                    ? `${item[[fields[0]]]}${
                        numberofFields >= 2
                          ? `${symbols && "-"}${item[[fields[1]]]}`
                          : ""
                      }${
                        numberofFields >= 3
                          ? `${symbols && "-"}${item[[fields[2]]]}`
                          : ""
                      }`
                    : item[wantedForDisplay]}
                </option>
              ))}
          </select>
        )}
        {icon && <i className={icon} onClick={onclickIcon}></i>}
        {src && <img src={src} alt="" onClick={onclickIcon} />}
      </div>
      {error && (
        <span className="message">
          {t(label)} {t("Must Be Not Empty")}
        </span>
      )}
    </div>
  );
}

export default StackForm;
