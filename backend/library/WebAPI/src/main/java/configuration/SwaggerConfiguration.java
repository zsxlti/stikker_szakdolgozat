package configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;


/*swagger file*/
/*http://localhost:8080/v2/api-docs*/

@EnableSwagger2
@Configuration
public class SwaggerConfiguration
{

        @Bean
        public Docket securityAPI()
        {
            return new Docket(DocumentationType.SWAGGER_2)
                    .groupName("securityService")
                    .select()
                    .apis(RequestHandlerSelectors.any())
                    .paths(PathSelectors.ant("/api/security/**"))
                    .build().produces(Collections.singleton("application/json"))
                    .apiInfo(metaInfo());
        }

        @Bean
        public Docket profileAPI()
        {
            return new Docket(DocumentationType.SWAGGER_2)
                .groupName("profileService")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/api/profile/**"))
                .build().produces(Collections.singleton("application/json"))
                .securitySchemes(new ArrayList<>(Arrays.asList(new ApiKey("Bearer %token", "Authorization", "Header"))))
                .apiInfo(metaInfo());
    }

    @Bean
    public Docket userAPI()
    {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("userService")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/api/user/**"))
                .build().produces(Collections.singleton("application/json"))
                .securitySchemes(new ArrayList<>(Arrays.asList(new ApiKey("Bearer %token", "Authorization", "Header"))))
                .apiInfo(metaInfo());
    }

    @Bean
    public Docket stickerAPI()
    {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("stickerService")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/api/sticker/**"))
                .build().produces(Collections.singleton("application/json"))
                .securitySchemes(new ArrayList<>(Arrays.asList(new ApiKey("Bearer %token", "Authorization", "Header"))))
                .apiInfo(metaInfo());
    }
    @Bean
    public Docket purchaseAPI()
    {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("purchaseService")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/api/purchase/**"))
                .build().produces(Collections.singleton("application/json"))
                .securitySchemes(new ArrayList<>(Arrays.asList(new ApiKey("Bearer %token", "Authorization", "Header"))))
                .apiInfo(metaInfo());
    }


    private ApiInfo metaInfo()
    {
        return new ApiInfoBuilder().title("Swagger for Demo app")
                                   .description("Demo application using swagger")
                                   .contact
                                   (
                                       new Contact
                                       (
                                           "Balogh Zsolt",
                                           "",
                                           "zsoltibaloghvp@gmail.com"
                                       )
                                   )
                                   .license("MIT")
                                   .version("1.0.0")
                                   .build();
    }
}
