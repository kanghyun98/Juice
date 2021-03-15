library(devtools)
library(taskscheduleR)
library(KeyboardSimulator)

keybd.press("win")
mouse.move(470, 838, duration = 1)    #태블로 선택
mouse.click()
mouse.move(81, 31, duration = 1)      #데이터
mouse.click()
Sys.sleep(1)
keybd.press("x")                      #모든 추출 새로고침
Sys.sleep(1)
keybd.press("enter")                  #새로고침(1분)
Sys.sleep(60)

keybd.press("enter")                  #닫기
Sys.sleep(1)
mouse.move(510, 29, duration = 1)     #서버
mouse.click()
Sys.sleep(1)
keybd.press("t")                      #태블로 퍼블릭
Sys.sleep(1)
keybd.press("s")                      #태블로 퍼블릭에 저장

  

