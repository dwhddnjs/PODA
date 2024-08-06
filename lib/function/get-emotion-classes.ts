// 스타일 계산 함수
export const getEmotionClasses = (index: number, length: number) => {
  let classes = ""

  // 첫 번째 또는 마지막 인덱스일 때 py-6 추가
  if (index === 0 || index === length - 1) {
    classes += "py-6 "
  }

  // length가 2일 때 두 번째 인덱스에 pb-6과 pt-0 추가
  if (length === 2 && index === 1) {
    classes += "pb-6 pt-0 "
  }

  return classes.trim()
}
