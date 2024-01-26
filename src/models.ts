
export interface SliderConfig {
  title: string,
  min?: number,
  max?: number,
  value: number,
}

export interface CvProcess {
  processName: string,
  imagePath?: string,
  originalImage?: string,
  processedImage?: string,
  configurations: SliderConfig[],
}