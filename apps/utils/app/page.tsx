"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEventHandler, useState } from "react";
import { message } from "react-message-popup";
import { useToast } from "@/hooks/use-toast";

export default function CommaSeparatedLinkStringPage() {
  return <CommaSeparatedLinkString />;
}

const CommaSeparatedLinkString = () => {
  const [needChangeValue, setNeedChangeValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [splitValue, setSplitValue] = useState(",");
  const { toast } = useToast();

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
        setChangeValue(needChangeValue.split("\n").join(splitValue + "\n"));
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
        // toast({
        //   description: "复制成功",
        // });
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
    <div className={" text-xs"}>
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
        readOnly
      ></Textarea>
    </div>
  );
};
