package com.intexsoft.malkevich.model;

import org.junit.Assert;
import org.junit.Test;

public class TaskTest {

    @Test
    public void testTask() {
        Task task = new Task();
        task.name = "z1";
        task.description = "d1";
        Assert.assertEquals("z1", task.name);
        Assert.assertEquals("d1", task.description);
    }
}
