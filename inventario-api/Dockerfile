FROM maven:3.9.6-eclipse-temurin-21 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY pom.xml .
COPY src ./src

# Executa o build do Maven. O comando 'mvn' já está disponível na imagem.
RUN mvn clean package -DskipTests

# Estágio 2: Run - Usando uma imagem leve com Java 21 para execução
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copia apenas o .jar do estágio de build para a imagem final
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta da aplicação
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
