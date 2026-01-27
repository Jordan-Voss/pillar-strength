# Stage 1: Build the JAR using Maven
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
# Copy the maven wrapper and pom first to cache dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
# Now copy source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Best practice: Don't run as root
RUN addgroup -S pillar && adduser -S pillar -G pillar
USER pillar
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8335
ENTRYPOINT ["java", "-jar", "app.jar"]