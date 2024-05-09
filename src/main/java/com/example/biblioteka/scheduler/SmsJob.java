package com.example.biblioteka.scheduler;

import com.example.biblioteka.bo.WypozyczenieBO;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class SmsJob implements Job {
    Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private WypozyczenieBO wypozyczenieBO;
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        wypozyczenieBO.wyslijSms();

    }
}
