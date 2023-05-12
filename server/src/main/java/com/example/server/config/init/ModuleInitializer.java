package com.example.server.config.init;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import com.example.server.service.ModuleService;
import com.example.server.service.TopicService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Slf4j
public class ModuleInitializer implements CommandLineRunner {
    private final ModuleService moduleService;
    private final TopicService topicService;

    @Override
    public void run(String... args) throws Exception {
        try {
            log.debug("initializing modules data");
            Module module = this.createModule("Эпоха чингизидов");
            this.createTopic("Монгольское вторжение", module);
            this.createTopic("Золотая орда", module);
            this.createTopic("Ак орда и ханство Абулхаира", module);
            this.createTopic("Сибирцы и Ногайцы", module);
            this.createTopic("Гос-во Эмира Темира и Могулистан", module);
            this.createTopic("Экономика и культура после монгольского периода", module);

            Module module2 = this.createModule("Казахское ханство");
            this.createTopic("Формирование казахского народа", module2);
            this.createTopic("Образование казахского ханства", module2);
            this.createTopic("Казахские ханы - от Керея до Тауке", module2);
            this.createTopic("Казахско-джунгарские войны", module2);
            this.createTopic("Присоединение младшего жуза к России", module2);
            this.createTopic("Ханство Aбылая", module2);
            this.createTopic("Восстания в 18 веке", module2);
            this.createTopic("Ликвидация ханской власти", module2);
            this.createTopic("Бокеевская орда", module2);
            this.createTopic("Последних хан казахов", module2);
        }
        catch (Exception e){
            log.debug(e.getMessage());
            throw e;
        }
    }
    private void createTopic(String title, Module module){
        Topic topic = new Topic();
        topic.setModule(module);
        topic.setTitle(title);
        topic.setFileUri(topic.getTitle() + ".pdf");
        topic.setImageUri(topic.getTitle() + ".jpg");
        topicService.save(topic);
    }
    private Module createModule(String title){
        Module module = new Module();
        module.setTitle(title);
        module.setImageUri(module.getTitle() + ".jpg");
        return moduleService.save(module);
    }
}
