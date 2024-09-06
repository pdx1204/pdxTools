"use client";
import { useRouter } from "next/navigation";

const Header: React.FC<any> = () => {
  const router = useRouter();

  const TAB_LIST = [
    { name: "逗号分隔链接字符串", path: "/" },
    { name: "地图经纬度转换", path: "/map-convert" },
    { name: "图片预览", path: "/image-preview" },
    { name: "URL Decode&Encode", path: "/url-decode-encode" },
    { name: "颜色值转换", path: "/color-convert" },
    { name: "正则表达式提取文本", path: "/regex-extract-text" },
  ];

  return (
    <nav className="bg-gray-900 p-4 rounded shadow-lg -mx-5 mb-10">
      <ul className="flex space-x-6">
        {TAB_LIST.map((item) => (
          <li
            key={item.name}
            className="text-gray-200 cursor-pointer hover:text-yellow-300 transition duration-300"
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
