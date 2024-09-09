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

  const processValue = (
    value: string,
    op?: { type: string; fn: any },
    sp?: string
  ) => {
    const v1 = value.split("\n").filter((v) => !!v);
    if (op?.type === "map") {
      return v1.map(op.fn).join(sp || splitValue);
    }
    if (op?.type === "slice") {
      return v1.slice(op.fn).join(sp || splitValue);
    }
    return v1.join(sp || splitValue);
  };

  const onNeedChangeValue: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setNeedChangeValue(value);
    setChangeValue(processValue(value));
  };

  const optionList = [
    {
      name: "加单引号",
      fn: () => {
        setChangeValue(
          processValue(needChangeValue, {
            type: "map",
            fn: (item: string) => `'${item}'`,
          })
        );
      },
    },
    {
      name: "加双引号",
      fn: () => {
        setChangeValue(
          processValue(needChangeValue, {
            type: "map",
            fn: (item: string) => `"${item}"`,
          })
        );
      },
    },
    {
      name: "去除第一个",
      fn: () => {
        setChangeValue(processValue(needChangeValue, { type: "slice", fn: 1 }));
      },
    },
    {
      name: "每行一个",
      fn: () => {
        setChangeValue(
          processValue(needChangeValue, undefined, splitValue + "\n")
        );
      },
    },
    {
      name: "去除引号",
      fn: () => {
        setChangeValue(
          processValue(needChangeValue, {
            type: "map",
            fn: (item: string) => item.replace(/['"]/g, ""),
          })
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
    <div className={" text-xs"}>
      <Textarea
        className={"w-full rounded p-2 text-base"}
        rows={10}
        name=""
        id=""
        value={needChangeValue}
        onChange={onNeedChangeValue}
      ></Textarea>
      <div className={"my-5 flex justify-start items-center"}>
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
