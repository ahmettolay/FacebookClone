# MİKROSERVİS İŞLEMLERİ VE NOTLARIM

## 1. Kurulum adımları

    1.1. Boş bir gradle projesi açtık.
    1.2. dependencies.gradle dosyasını koladık
        1.2.1.ext{} bloğu içerisindeki kütüphaneleri projemize dahil ettik
        1.2.2.versions{} bloğu içerisinde kullanacağımız kütüphaneleri belirledik.
    1.3. build.gradle dosyasını kodladık, bu dosya içinde tüm alt projelerimizde ortak olarak 
    kullanacağımız kütüphaneleri belirledik
    1.4. Uygulamamızın mimarisi gereği ihtiya. duyduğumuz mikroservisleri modül olarak ekledik.
    1.5. Her bir modül için eklememiz gereken aşağıdaki kod bloğunu
    build.gradle dosyalarına ekledik.
```
    buildscript {
        dependencies {
            classpath("org.springframework.bott:spring-boot-gradle-plugin:${versions.springBoot}")
        }
    }
```
    1.6. Tüm modüllerimize monolitik mimaride kullandığımız default kodlamaları ekledik.
    1.7. Eğer bir modül içinde kullanmak istediğimiz özel bağımlılıkları var ise bunları
    build.gradle dosyalarını ekledik.

## 2. Mongo DB Kurulum ve Kullanım
### 2.1. Mongo DB Docker üzerinde çalıştırmak

    docker kurulu olan bir sistem üzerinde command satırına girerek aşağıda
    yer alan komutları yazarak docker üzerinden çalıştırınız.


    > docker run --name dockermongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -d mongo
    Admin: root, Psw: example
## 2.2. MongoDB ye bağlamak

    DİKKAT!!!
    mongodb kullanırken admin kullanıcısı ve şifrelerini veritabanlarına erişmek
    için kullanmayınız.
    Yeni bir veritabanı oluşturmak için admin kullanıcısı ile işlem yapılır ve 
    bu veritabanına atanmak üzere yeni bir kullanıcı oluşturur. Böylelikle
    admin kullanıcısının ihtiyaç kalmadan DB üzerinde işlemler gerçekleştirilir.
    Admin kullanıcısı uygulamalar tarafından erişilmemelidir. Her uygulama için özelleştirilmiş
    kullanıcılar kullanılmalıdır.

    1- Öncelikle bir veritabanı oluşturuyorsunuz.(FaceBookDB)
    2- mongosh kullanarak konsolda 'use DB_ADI' yazıyorsunuz ve ilgili DB'ye geçiş yapıyorsunuz.
    3- Yine aynı ekranda yeni bir kullanıcı oluşturmanız gereklidir. Bu kullanıcı yetkili olacaktır.
    
        > db.createUser({user: "Java7User",pwd: "root",roles: ["readWrite", "dbAdmin"]})

## 3.0 RabbitMQ

    3.1 RabbitMQ Dockeer üzerinde çalıştırmak
    docker run -d --name my-rabbitmq -e RABBITMQ_DEFAULT_USER=java7 -e RABBITMQ_DEFAULT_PASS=root -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    
    3.2 RabbitMQ ye bağlanmak
## 4.0 Zipkin Server Kurmak ve Kullanmak
    docker run --name zipkinfb -d -p 9411:9411 openzipkin/zipkin
    Zipkin için gereki bağımlılıklar

## 5.0 Redis Kurulum ve Kullanım
    docker run --name localredis -d -p 6379:6379 redis
    Redis için gerekli bağımlılıklar
    "org.springframework.boot:spring-boot-starter-data-redis:${versions.springBoot}"

## 6.0 ElasticSearch Kurulum ve Kullanım
    !!!DİKKAT!!!
    Spirng ile kullanımda sürüm önemlidir.Hangi spring Boot sürümünü kullandıysanız ona uygun bir sürüm kullanılmalırıdr.

    1-docker network create somenetwork
    2-docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e ES_JAVA_OPTS="-Xms512m -Xmx1024m" -e "discovery.type=single-node" elasticsearch:7.17.9
    3-springBootDataElasticsearch     : "org.springframework.boot:spring-boot-starter-data-elasticsearch:${versions.springBoot}",
    
## 7.0 Projenin Docker image olarak oluşturulması
    Herhangi bir projenin paket haline getirilmesi 
    1- Gradle -> [Projeniin Adı] ->Task -> build -> build
    1- Gradle -> [Projeniin Adı] ->Task -> build -> buildDependents
    Bu iki adımdan sonra projenin altında build klasörü oluşur bu klasör
    içerisndeki jar dostasu oluşur. build -> libs -> [Projenin Adı ].jar
## 7.1 Dockerfile
    Herhangi bir projenin paket haline getirilmesi için öncelikle
    1- Gradle -> [Projenin Adı ] -> Tasks -> build -> build
    2- Gradle -> [Projenin Adı ] -> Tasks -> build -> buildDependents
    bu iki adımdan sonra projenin altında build klasörü oluşur bu klasöt
    içerisinde jar dosyası oluşur. build->libs-> [Projenin Adı].jar
## 7.1 Dockerfile
    Dockerfile bir docker image oluşturmak için kullanılan özel 
    bir dosyadır. bunun içinde ihtiyaç duyulan tüm komutlar yer alır.
    bu komutlar ile microservisimizin çalışması için gerekli olan
    parametreler ve bağımlılıklar belirtilir.

        # İşletim sistemi ve Java JDK eklenir.
        # FROM amazoncorretto:17 -- amazon corretto ile java jdk17 sürümü kullanılacak demektir.
        FROM azul/zulu-openjdk-alpine:17.0.7
        # build aldığımız jar dosyasını docker imajımızın içine kopyalıyoruz.
        COPY ConfigServerGit/build/libs/ConfigServerGit-v.1.0.jar app.jar
        # docker imajımızın çalışması için java uygulamamızı tetikliyoruz.
        ENTRYPOINT ["java","-jar","/app.jar"]

## Docker Imaje oluşturmak

    DİKKAT!!!!
    Docker image oluştururken docker.hub üzerindeki repoya önderilmek istenilen
    image lar için isimlendirmeyi doğru yapmanız gereklidir.
    hub.docker repo adınız / image adınız : versiyon numarası
    şeklinde yazmanız gereklidir.
    DİKKAT!!!!
    ifade sonunda olan nokta (.) unutulmamalıdır. rastgele bir nokta değildir.
    docker build -t ahmettolay/java7-configservergit:v.1.0 .
    docker build -t ahmettolay/java7-authservice:v.1.1 .
    docker build -t ahmettolay/java7-userservice:v.1.0 .
    docker build -t ahmettolay/java7-gatewayservice:v.1.0 .