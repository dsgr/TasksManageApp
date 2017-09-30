package com.intexsoft.malkevich.model;

import org.junit.Assert;
import org.junit.Test;

public class UserTest {

    @Test
    public void testTask() {
        User user = new User();
        user.username = "z1";
        Assert.assertEquals("z1", user.username);
    }
}
