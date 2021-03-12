library(NIADic)
library(KoNLP)
library(xml2)
library(rvest)
library(googledrive)
library(googlesheets4)
library(dplyr)

useNIADic()


tnons1 <- range_read(drive_get("stockofKOSPI"), range = "B1:B802") %>% as.data.frame()
tnons2 <- range_read(drive_get("stockofKOSPI"), range = "C1:C802") %>% as.data.frame()


page <- as.data.frame(matrix(ncol=1, nrow=801))

for(i in 1:nrow(tnons)) {
  page[i,1] <- ceiling((tnons2[i,1] - tnons1[i,1])/20)
}

temp <- drive_get("stockofKOSPI") %>% read_sheet()
DAY <- Sys.Date()
finance_naver_url_1 <- 'https://finance.naver.com/news/news_search.nhn?rcdate=&q='
finance_naver_url_2 <- '&x=0&y=0&sm=all.basic&pd=4&stDateStart='
finance_naver_url_3 <- '&stDateEnd='
finance_naver_url_4 <- '&page='

keywords <- matrix(ncol=5, nrow=801) %>% as.data.frame()

 for(name in 1:801) {
  
  QUERY <- URLencode(iconv(as.character(temp[name,1]),'UTF-8'))

    if (page[name,1] ==0) {
    next
    PAGE <- seq(from=1, to=page[name,1], by=1)
  }

    for(x in PAGE) {
    finance_naver_url <-  paste0(finance_naver_url_1,QUERY,finance_naver_url_2,DAY,finance_naver_url_3,DAY,finance_naver_url_4,PAGE)
  }
  
  
  news_titles <- NULL

    for(url in finance_naver_url) {
    html <- read_html(url,encoding="CP949")
    news_titles <- c(news_titles,html %>% 
                       html_nodes(css='.articleSubject') %>%   
                       html_nodes('a') %>%
                       html_text()
    )
    }
  
  
  news_titles_pre <- gsub("[\n]",'', news_titles)
  news_titles_pre <- gsub("[[:punct:]]",'', news_titles_pre)
  news_titles_pre <- gsub("[[:cntrl:]]",'',news_titles_pre)
  noun <- sapply(news_titles_pre, extractNoun, USE.NAMES = F) %>% unlist()
  noun2 <- Filter(function(x){nchar(x) >=2}, noun)
  wordFreq <- table(noun2)
  noundta <- sort(wordFreq, decreasing = T)
  keywords[name,1:5] <- rownames(noundta[1:5]) # 상위 5개 단어
  
  
}


drive_get("stockofKOSPI") %>% range_write(data=keywords, range="G2",col_names = F)

