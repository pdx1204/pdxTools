"use client";
import { useRouter } from "next/navigation";

const Header: React.FC<any> = () => {
  const router = useRouter();

  const TAB_LIST = [
    {
      name: "图片预览",
      fn: () => {
        router.push("/image-preview");
      },
    },
    {
      name: "URL Decode&Encode",
      fn: () => {
        router.push("/url-decode-encode");
      },
    },
    {
      name: "颜色值转换",
      fn: () => {
        router.push("/color-convert");
      },
    },
    {
      name: "逗号分隔链接字符串",
      fn: () => {
        router.push("/");
      },
    },
    {
      name: "正则表达式提取文本",
      fn: () => {
        router.push("/regex-extract-text");
      },
    },
  ];

  return (
    <div>
      <ul className={"flex"}>
        {TAB_LIST.map((item) => (
          <li
            key={item.name}
            className={"mr-4 cursor-pointer"}
            onClick={item.fn}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
