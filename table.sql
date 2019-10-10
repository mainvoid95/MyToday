
유저 테이블 생성 sql
CREATE TABLE user (     
    `user_number`  INT  NOT NULL    AUTO_INCREMENT,      
    `user_id`      VARCHAR(45)    NOT NULL,     
    `user_email`   VARCHAR(45)  NOT NULL    ,      
    `user_pass`    VARCHAR(255)    NOT NULL        ,      
    `user_name`    VARCHAR(45)    NULL        ,      
    PRIMARY KEY (user_number),
    UNIQUE INDEX (user_id)
    );


journal 테이블 생성 sql
CREATE TABLE journal
(
    `journal_num`          INT         NOT NULL    AUTO_INCREMENT, 
    `user_number`          INT         NOT NULL    , 
    `journal_content`      TEXT        NOT NULL    , 
    `journal_create_date`  DATETIME    NOT NULL   DEFAULT NOW() , 
    `journal_fix_date`     DATETIME    NULL        , 
    PRIMARY KEY (journal_num),
    FOREIGN KEY (user_number) REFERENCES user (user_number)
);

