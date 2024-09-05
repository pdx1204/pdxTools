"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEventHandler, useState } from "react";
import { message } from "react-message-popup";

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
      fn: () => {
        setChangeValue(
          needChangeValue
            .split("\n")
            .map((item) => `'${item}'`)
            .join(splitValue)
        );
      },
    },
    {
      name: "加双引号",
      fn: () => {
        setChangeValue(
          needChangeValue
            .split("\n")
            .map((item) => `"${item}"`)
            .join(splitValue)
        );
      },
    },
    {
      name: "去除第一个",
      fn: () => {
        setChangeValue(needChangeValue.split("\n").slice(1).join(splitValue));
      },
    },
    {
      name: "每行一个",
      fn: () => {
        setChangeValue(needChangeValue.split(splitValue).join("\n"));
      },
    },
    {
      name: "去除引号",
      fn: () => {
        setChangeValue(
          needChangeValue
            .split("\n")
            .map((item) => item.replace(/['"]/g, ""))
            .join(splitValue)
        );
      },
    },
    {
      name: "复制",
      fn: () => {
        navigator.clipboard.writeText(changeValue);
        message.success("复制成功");
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
      <Textarea
        className={"w-full rounded p-2 text-base"}
        rows={10}
        name=""
        id=""
        value={needChangeValue}
        onChange={onNeedChangeValue}
      ></Textarea>
      <div className={"my-5 flex"}>
        <Input
          type="text"
          className={"w-[50px] rounded text-base"}
          value={splitValue}
          onChange={(e) => setSplitValue(e.target.value)}
        />
        {optionList.map((item) => (
          <Button
            key={item.name}
            className={"mx-2 text-base"}
            onClick={item.fn}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Textarea
        className={"w-full rounded p-2 text-base"}
        rows={10}
        name=""
        id=""
        value={changeValue}
      ></Textarea>
    </div>
  );
};
