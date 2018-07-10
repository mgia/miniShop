BEGIN TRANSACTION;
CREATE TABLE user (
	id INTEGER NOT NULL,
	public_id VARCHAR(50),
	name VARCHAR(50),
	password VARCHAR(80),
	admin BOOLEAN,
	PRIMARY KEY (id),
	UNIQUE (public_id),
	CHECK (admin IN (0, 1))
);
INSERT INTO user VALUES(1,'db914f31-291e-4380-88a8-984d23c397f4','admin','sha256$0SCpns3Y$430e984d1f2c854c007060087ba752daeb60b4e030ace240f817f357914dca21',1);
INSERT INTO user VALUES(2,'9fa781e1-a38e-4dc0-a6bb-7a2f6cc81339','bob','sha256$2zej8JRj$262e7cd0796681251e79945f53f4169cf6e10be64c66784620ef0647abd69f7d',0);
INSERT INTO user VALUES(3,'c716e84c-d2b5-4e22-b842-fd503ef4d13b','mina','sha256$lJraBM8v$c48e2a9154f49a249b8c36cde3db67e1f47303989599a8f0408a063c46d790c0',0);
INSERT INTO user VALUES(4,'c2b47caf-f132-48fb-ad6a-73d047bc9c6e','jeff','sha256$VrMJfuex$c8f8945c1a471b653c02cf7cf1d563d5e424b03d38b3b0104cf13559a8ac2c6c',0);
CREATE TABLE item (
	id INTEGER NOT NULL,
	name VARCHAR(50),
	description VARCHAR(100),
	image_url VARCHAR(200),
	price INTEGER,
	PRIMARY KEY (id)
);
INSERT INTO item VALUES(1,'Fancy Ring','This is a fancy ring.','https://products.ritani.com/uploads/photo/image/69732/M1PC2816C_me_TableView1-shadow.png?w=640&h=430&fit=fill&fm=jpg&q=65&bg=FFF',300);
INSERT INTO item VALUES(2,'Nice Ring','This is a nice ring.','https://c.shld.net/rpx/i/s/i/spin/10127009/prod_19304714112?hei=1000&wid=1000&op_sharpen=1',30);
INSERT INTO item VALUES(3,'Ok Ring','This is an ok ring.','https://cdn.caratlane.com/media/catalog/product/cache/6/image/440x440/9df78eab33525d08d6e5fb8d27136e95/U/R/UR00018-YG0000_1_lar.jpg',3);
INSERT INTO item VALUES(4,'Fancy Watch','This is a fancy watch.','https://www.avianneandco.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/2/22185-1_1_1.jpg',300);
INSERT INTO item VALUES(5,'Nice Watch','This is a nice watch.','https://media.tiffany.com/is/image/Tiffany/1X/20160322_CB_Tiffany_View_All_Browse_Grid_Tile1_3x2Promo_US_CT60_Watches_3x2_v1.jpg?v=20161026164214',30);
INSERT INTO item VALUES(6,'Ok Watch','This is an ok watch.','https://i5.walmartimages.com/asr/69b83722-dd4d-4f39-ba81-3412788965d3_1.44a41dc6107842707509a751e7615941.jpeg',3);
INSERT INTO item VALUES(7,'Fancy Necklace','This is a fancy necklace.','http://allezgisele.com/wp-content/uploads/2018/03/most-expensive-diamond-necklace-beautiful-top-10-most-expensive-diamond-necklaces-in-the-world-of-most-expensive-diamond-necklace.jpg',300);
INSERT INTO item VALUES(8,'Nice Necklace','This is a nice necklace.','http://desiree-schmidt.com/2793-thickbox_default/nice-sterling-silver-litchi-necklace.jpg',30);
INSERT INTO item VALUES(9,'Ok Necklace','This is an ok necklace.','https://images-na.ssl-images-amazon.com/images/I/51TVniIf5-L._SY395_.jpg',3);
CREATE TABLE IF NOT EXISTS "order" (
	id INTEGER NOT NULL,
	user_id INTEGER,
	item_id INTEGER,
	quantity INTEGER,
	timestamp DATETIME,
	PRIMARY KEY (id)
);
CREATE TABLE category (
	id INTEGER NOT NULL,
	name VARCHAR(50),
	PRIMARY KEY (id),
	UNIQUE (name)
);
INSERT INTO category VALUES(1,'Fancy');
INSERT INTO category VALUES(2,'Nice');
INSERT INTO category VALUES(3,'Ok');
INSERT INTO category VALUES(4,'Ring');
INSERT INTO category VALUES(5,'Watch');
INSERT INTO category VALUES(6,'Necklace');
CREATE TABLE item_category (
	id INTEGER NOT NULL,
	category_id INTEGER,
	item_id INTEGER,
	PRIMARY KEY (id)
);
INSERT INTO item_category VALUES(1,1,1);
INSERT INTO item_category VALUES(2,4,1);
INSERT INTO item_category VALUES(3,2,2);
INSERT INTO item_category VALUES(4,4,2);
INSERT INTO item_category VALUES(5,3,3);
INSERT INTO item_category VALUES(6,4,3);
INSERT INTO item_category VALUES(7,1,4);
INSERT INTO item_category VALUES(8,5,4);
INSERT INTO item_category VALUES(9,2,5);
INSERT INTO item_category VALUES(10,5,5);
INSERT INTO item_category VALUES(11,5,6);
INSERT INTO item_category VALUES(12,3,6);
INSERT INTO item_category VALUES(13,1,7);
INSERT INTO item_category VALUES(14,6,7);
INSERT INTO item_category VALUES(15,6,8);
INSERT INTO item_category VALUES(16,2,8);
INSERT INTO item_category VALUES(17,3,9);
INSERT INTO item_category VALUES(18,6,9);
COMMIT;
