library(googledrive)
library(googlesheets4)
library(rvest)

temp <- drive_get("stockofKOSPI") %>% read_sheet()
DAY <- Sys.Date()
finance_naver_url_1 <- 'https://finance.naver.com/news/news_search.nhn?rcdate=&q='
finance_naver_url_2 <- '&x=0&y=0&sm=all.basic&pd=4&stDateStart='
finance_naver_url_3 <- '&stDateEnd='
tnons2 <- matrix(ncol=1, nrow=801)
tnons2 <- as.data.frame(tnons2)

for(i in 1:801) {
  QUERY <- URLencode(iconv(as.character(temp[i,1]),'UTF-8'))
  finance_naver_url <- paste0(finance_naver_url_1,QUERY,finance_naver_url_2,DAY,finance_naver_url_3,DAY)
  the_number_of_news <- NULL
  html <- read_html(finance_naver_url, encoding = "CP949")
  the_number_of_news <- (html_nodes(html,'p strong') %>% html_text())[2] %>% as.numeric()
  tnons2[i,1] <- the_number_of_news
}

drive_get("stockofKOSPI") %>% range_write(data=tnons2, range="C2",col_names = F)

