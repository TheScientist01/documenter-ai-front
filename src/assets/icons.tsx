import { SVGProps } from "react";

export function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

export function FolderClose() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-folder"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

export function FolderOpen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-folder-open"
    >
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function RemoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F35A52"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function SwitchArrowsIcon(props: SVGProps<SVGSVGElement>) {
  return (<svg
    className="svg-icon"
    style={{
      width: "30",
      height: "30",
      verticalAlign: "middle",
      fill: "#fff",
      overflow: "hidden"
    }}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M504.7 138.1c-91.4 0-175.4 31.4-241.9 83.9l51.6 63.6c52.4-41.1 118.5-65.7 190.3-65.7 170.5 0 308.7 138.2 308.7 308.7 0 21.9-2.3 43.3-6.7 64l79.5 20.1c5.9-27.1 9.1-55.2 9.1-84 0-215.7-174.9-390.6-390.6-390.6zM702.4 765.8c-53.6 44.7-122.5 71.6-197.7 71.6-170.5 0-308.7-138.2-308.7-308.7 0-36.4 6.3-71.3 17.9-103.7l-79.7-20.1c-13 38.9-20.1 80.6-20.1 123.9 0 215.7 174.9 390.6 390.6 390.6 94.8 0 181.7-33.8 249.3-89.9l-51.6-63.7z"
      fill="#cbcbcb"
    />
    <path
      d="M173.5 416.4m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z"
      fill="#cbcbcb"
    />
    <path
      d="M286.5 256.4m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z"
      fill="#cbcbcb"
    />
    <path
      d="M727.5 799.4m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z"
      fill="#cbcbcb"
    />
    <path
      d="M845.8 605.8m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z"
      fill="#cbcbcb"
    />
    <path
      d="M33.5 528.4c-14.1-17.7-11.2-43.5 6.5-57.6l108-86.1c17.7-14.1 43.5-11.2 57.6 6.5 14.1 17.7 11.2 43.5-6.5 57.6L91 534.9c-17.7 14.1-43.4 11.2-57.5-6.5z"
      fill="#cbcbcb"
    />
    <path
      d="M285.2 556.4c-17.7 14.1-43.5 11.2-57.6-6.5l-86.1-108c-14.1-17.7-11.2-43.5 6.5-57.6 17.7-14.1 43.5-11.2 57.6 6.5l86.1 108c14.1 17.7 11.2 43.5-6.5 57.6zM977.7 483.6c15.4 16.5 14.5 42.5-2 57.9l-101 94.2c-16.5 15.4-42.5 14.5-57.9-2-15.4-16.5-14.5-42.5 2-57.9l101-94.2c16.6-15.4 42.5-14.5 57.9 2z"
      fill="#cbcbcb"
    />
    <path
      d="M723.2 474.1c16.5-15.4 42.5-14.5 57.9 2l94.2 101c15.4 16.5 14.5 42.5-2 57.9-16.5 15.4-42.5 14.5-57.9-2l-94.2-101c-15.5-16.6-14.6-42.5 2-57.9z"
      fill="#cbcbcb"
    />
  </svg>
  )
}

export function SwitchBetweenIcon() {
  return (<svg
    className="svg-icon"
    style={{
      width: "1em",
      height: "1em",
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden"
    }}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M886.2 604.8H137.8c-22.1 0-40 17.9-40 40 0 8.4 2.6 16.2 7 22.6 1.9 4.5 4.8 8.7 8.4 12.4L289.5 856c7.8 7.8 18 11.7 28.3 11.7s20.5-3.9 28.3-11.7c15.6-15.6 15.6-40.9 0-56.6L231.3 684.8h654.8c22.1 0 40-17.9 40-40s-17.8-40-39.9-40zM137.8 419.2h748.4c22.1 0 40-17.9 40-40 0-8.4-2.6-16.2-7-22.6-1.4-3.3-3.4-6.5-5.8-9.5L769.2 170.9c-14-17.1-39.2-19.6-56.3-5.6-17.1 14-19.6 39.2-5.6 56.3l96.3 117.6H137.8c-22.1 0-40 17.9-40 40s17.9 40 40 40z" />
  </svg>
  )
}