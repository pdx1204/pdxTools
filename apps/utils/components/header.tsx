"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Header: React.FC<any> = () => {
  const router = useRouter();

  const theme = useTheme();

  const TAB_LIST = [
    { name: "逗号分隔链接字符串", path: "/" },
    { name: "地图经纬度转换", path: "/map-convert" },
    { name: "图片预览", path: "/image-preview" },
    { name: "URL Decode&Encode", path: "/url-decode-encode" },
    { name: "颜色值转换", path: "/color-convert" },
    { name: "正则表达式提取文本", path: "/regex-extract-text" },
  ];

  return (
    <nav
      className={`p-4 shadow-lg ${theme.resolvedTheme === "dark" ? "bg-gray-900" : "bg-white"} -mx-5 mb-10 text-sm`}
    >
      <ul className="flex space-x-6">
        {TAB_LIST.map((item) => (
          <li
            key={item.name}
            className={`cursor-pointer transition duration-300 
              ${theme.resolvedTheme === "dark" ? "text-gray-200 hover:text-yellow-300" : "text-gray-800 hover:text-yellow-600"}`}
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
