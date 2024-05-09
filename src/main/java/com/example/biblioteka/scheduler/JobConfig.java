package com.example.biblioteka.scheduler;

import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JobConfig {
    @Bean
    public JobDetail jobDetail() {
        return JobBuilder.newJob(SmsJob.class)
                .storeDurably()
                .withIdentity("Qrtz_Job_Detail")
                .withDescription("Invoke Sample Job service...")
                .build();
    }

    @Bean
    public Trigger trigger(JobDetail job) {
        return TriggerBuilder.newTrigger().forJob(job)
                .withIdentity("trigger3")
                .withSchedule(CronScheduleBuilder.cronSchedule("0/30 * * * * ?"))
                .build();
    }
}
