
-- 다이어리 테이블
CREATE TABLE diary(
    diary_num int(11) NOT NULL AUTO_INCREMENT,
    write_date date NOT NULL,
    diary_text text,
    PRIMARY KEY (diary_num),
    UNIQUE INDEX (write_date)
);

-- todo 테이블
CREATE TABLE todo(
    id int(11) NOT NULL AUTO_INCREMENT,
    write_date DATETIME NOT NULL,
    todo_text text,
    done bool,
    PRIMARY KEY (id)
);

-- 테스트용 데이터 
INSERT INTO diary (diary_num, write_date, diary_text) VALUES (1,'2019-08-26','테스트 일기입니다 테스트 일기입니다 테스트 일기입니다 테스트 일기입니다 ');
INSERT INTO diary (write_date, diary_text) VALUES ('2019-08-25','테스트 일기입니다 테스트 일기입니다 테스트 일기입니다 테스트 일기입니다 ');

Insert INTO todo (write_date, todo_text, done) VALUES ('2019-08-26','todo테스트', true );
Insert INTO todo (write_date, todo_text, done) VALUES ('2019-08-27','todo테스트2', false );