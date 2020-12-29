package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class Result implements Serializable {
    @SerializedName("result")
    List<String> result;

    public List<String> getResult() {
        return result;
    }

    public Result(List<String> result) {
        this.result = result;
    }
}
