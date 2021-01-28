# library loading #
library(rvest)
library(dplyr)
library(lubridate)
library(stringr)
library(KoNLP)
library(tm)
library(wordcloud)
library(NIADic)
# 네이버의 주소 구조 이해 #
# 검색 조건 : 네이버, 삼성전자 검색, 최신순, 1시간 전, 1page
# https://search.naver.com/search.naver?&where=news&query=삼성전자&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=7&ds=2021.01.26.15.42&de=2021.01.26.16.42&docid=&nso=so:dd,p:1h,a:all&mynews=0&start=1&refresh_start=0

# 검색 조건 : 네이버, 삼성전자 검색, 최신순, 1시간 전, 2page
# https://search.naver.com/search.naver?&where=news&query=삼성전자&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=7&ds=2021.01.26.15.41&de=2021.01.26.16.41&docid=&nso=so:dd,p:1h,a:all&mynews=0&start=11&refresh_start=0

# 검색 조건 : 네이버, 삼성전자 검색, 최신순, 1시간 전, 3page
# https://search.naver.com/search.naver?&where=news&query=삼성전자&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=7&ds=2021.01.26.15.47&de=2021.01.26.16.47&docid=&nso=so:dd,p:1h,a:all&mynews=0&start=21&refresh_start=0


# 우리가 전역변수로 설정하고 수시로 수정해야 할 변수들 (자동화 가능하게 해야 함)
# query = 주식 종목(검색 키워드) 만약 띄어쓰기가 돼있는 검색종목이 있다면 +로 연결. ex) 삼성+전자
# ds = day.start = yyyy.mm.dd.hh.mm, %Y.%m.%d.%H.%M in R 
# de = day.end = yyyy.mm.dd.hh.mm
# start = page 수를 의미, page 1 = start=1, page 2 = start=11, page3 = start= 21 => 초항 1, 공차 10 등차로 페이지 표현




# 웹 주소 구조 파악 후 문자열 결합하여 R에서 사용할 수 있는 형태로 웹 주소 만들기
# 변수 입력하기, 삼성전자 기준
QUERY <- '삼성전자' # query 변수! 주식 종목명이 들어갈 자리.
date.end.po <- Sys.time() #현재시간을 POSIXt 형으로 반환하여 date.end.po로 저장.
date.end.ch <- format(date.end.po, "%Y.%m.%d.%H.%M") #POSIXt -> character 형 변환 일어남.
date.end.ch # 현재시간을 charcter 형으로 저장. de 변수!

hour(date.end.po) <- hour(date.end.po)-1
date.start.po <- date.end.po
date.start.ch <- format(date.start.po, "%Y.%m.%d.%H.%M")
date.start.ch # 현재시간에서(date.end.po) 시간을 -1 한 후 character 형으로 변환. ds 변수!


naver_url_1 <- "https://search.naver.com/search.naver?&where=news&query="
naver_url_2 <- "&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=7&ds="
naver_url_3 <- "&de="
naver_url_4 <- "&docid=&nso=so:dd,p:1h,a:all&mynews=0&start="
naver_url_5 <- "&refresh_start=0"

# naver_url <- paste0(naver_url_1,QUERY,naver_url_2,date.start.ch,naver_url_3,date.end.ch,naver_url_4,PAGE,naver_url_5)
# naver_url # 코드실행시간 기준, 1시간 전, 삼성전자 검색, 최신순으로, 1page만


PAGE <- seq(from=1, to=191, by=10)

for(x in PAGE) {
  naver_url <- paste0(naver_url_1,QUERY,naver_url_2,date.start.ch,naver_url_3,date.end.ch,naver_url_4,PAGE,naver_url_5) 
};naver_url

length(naver_url)


news_links <- NULL
for(url in naver_url) {
  html <- read_html(url)
  news_links <- c(news_links,html %>% 
                    html_nodes('#wrap') %>%
                    html_nodes('#container') %>%
                    html_nodes('#content') %>%
                    html_nodes('#main_pack') %>%
                    html_nodes(css='.sc_new.sp_nnews._prs_nws')%>%
                    html_nodes(css='.api_subject_bx') %>%
                    html_nodes(css='.group_news') %>%
                    html_nodes(css='.list_news') %>%
                    html_nodes(css='.bx') %>%
                    html_nodes(css='.news_wrap.api_ani_send') %>%
                    html_nodes(css='.news_area') %>%   # 밑 행 a.news_tit은 유일해서 이 위로 사실 생략 가능
                    html_nodes('a.news_tit') %>%
                    html_attr('title')
  )
}

news_titles <- news_links;news_titles # 코드 실행시간으로부터 1시간 내의 기사의 제목들 반환
the_number_of_news <- length(news_titles) # 코드 실행시간으로부터 1시간 내의 기사 개수 반환



news_titles_pre <- gsub("[\n]",'', news_titles)
news_titles_pre <- gsub("[[:punct:]]",'', news_titles_pre)
news_titles_pre <- gsub("[[:cntrl:]]",'',news_titles_pre)
#txt_pre <- gsub("[a-z]+",'', txt_pre)
#txt_pre <- gsub("[A-Z]+",'', txt_pre)
#news_titles_pre<- gsub('\\s+','', news_titles_pre)
#news_titles_pre <- gsub('\\d+','',news_titles_pre)
news_titles_pre

write.csv(news_titles_pre, "news_titles_pre.csv", quote = F) #사전저장
titles_text <- read.csv('news_titles_pre.csv',header=T,stringsAsFactors = F)[,2]

useNIADic()

#===============#
#dics <- c('sejong','woorimalsam','NIADic')
#buildDictionary(ext_dic = 'NIADic', user_dic = data.frame('코스피','삼성전자','당근마켓','이재용'))


#buildDictionary(ext_dic = dics, user_dic = data.frame(readLines("한글종목약명.txt", encoding="UTF-8")))
#주식종목명 추가 필요시 
#==============#
noun <- sapply(titles_text, extractNoun, USE.NAMES = F) %>% unlist()
noun2 <- Filter(function(x){nchar(x) >=2}, noun)
wordFreq <- table(noun2)
noundta <- sort(wordFreq, decreasing = T)
keywords <- rownames(noundta[1:5]) # 상위 5개 단어


sprintf("지금으로부터 1시간 전 YG 관련 뉴스 개수는 %d개 입니다.대표 키워드는 %s,%s,%s,%s,%s 입니다.",the_number_of_news,keywords[1],keywords[2],keywords[3],keywords[4],keywords[5])