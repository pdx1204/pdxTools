"use client";
import { ChangeEventHandler, useState } from "react";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <CommaSeparatedLinkString />
    </div>
  );
}

const TAB_LIST = [
  {
    name: "图片预览",
  },
  {
    name: "URL Decode&Encode",
  },
  {
    name: "颜色值转换",
  },
  {
    name: "常用颜色",
  },
  {
    name: "逗号分隔链接字符串",
  },
  {
    name: "正则表达式提取文本",
  },
];
const Header: React.FC<any> = () => {
  return (
    <div>
      <ul className={"flex"}>
        {TAB_LIST.map((item) => (
          <li key={item.name} className={"mr-4 cursor-pointer"}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommaSeparatedLinkString = () => {
  const [needChangeValue, setNeedChangeValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [splitValue, setSplitValue] = useState(",");

  const onNeedChangeValue: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setNeedChangeValue(value);
    console.log(value, "fsdfsa", value.split("\n"));
    setChangeValue(value.split("\n").join(splitValue));
  };

  const optionList = [
    {
      name: "加单引号",
    },
    {
      name: "加双引号",
    },
    {
      name: "去除第一个",
    },
    {
      name: "每行一个",
    },
    {
      name: "去除引号",
    },
    {
      name: "复制",
      fn: () => {
        navigator.clipboard.writeText(changeValue);
      },
    },
    {
      name: "清空",
      fn: () => {
        setNeedChangeValue("");
        setChangeValue("");
      },
    },
  ];
  return (
    <div className={" text-xs px-5 py-5"}>
      <textarea
        className={"w-full border border-red-400 rounded p-2 text-base"}
        rows={10}
        name=""
        id=""
        value={needChangeValue}
        onChange={onNeedChangeValue}
      ></textarea>
      <div className={"my-5"}>
        <input
          type="text"
          className={
            "w-[50px] px-1 py-1 border border-red-400 rounded text-base"
          }
          value={splitValue}
          onChange={(e) => setSplitValue(e.target.value)}
        />
        {optionList.map((item) => (
          <button
            key={item.name}
            className={"mx-2 text-base"}
            onClick={item.fn}
          >
            {item.name}
          </button>
        ))}
      </div>
      <textarea
        className={"w-full border border-red-400 rounded p-2 text-base"}
        rows={10}
        name=""
        id=""
        value={changeValue}
      ></textarea>
    </div>
  );
};
