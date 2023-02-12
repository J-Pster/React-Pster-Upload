export interface Config {
  maxZoom: number;
  aspectRatio: number;
}

export interface UploadProps {
  type: "image" | "file";
  iconSrc: string;
  strategy: (file: File) => Promise<any>;
  config: Config;
}

export interface CropperProps {
  src: string;
  name: string;
  onSave: (file: File) => void;
  config: Config;
}
