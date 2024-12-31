interface ResumeInfosData {
  fullName: string
  headline: string
  email: string
  website: string
  phone: string
  location: string
}

interface ResumeImageData {
  url: string
  visible: boolean
}

interface ResumeContentData {
  image: ResumeImageData
  infos: ResumeInfosData
}

interface ResumeData {
  content: ResumeContentData
  // structure: ResumeStructureData
}
