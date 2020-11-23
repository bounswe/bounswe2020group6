package com.example.akademise;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface AkademiseApi {

  /*  @Headers({
            "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA1NjIyMzkwfQ.5t4GG2JF-SJB-orXi25rQiaAdw-a27I9Fw_0-IVu8pk"
    })

   */

    @Headers({ "Content-Type: application/json;charset=UTF-8"})
    @POST("validate")
    Call<Validation> createValidation(@Body Validation validation, @Header("Authorization") String auth);

    @GET("posts") //relative path (/search?query=er&type=1)
    Call<List<Project>> getPostsSearched(@Query("userId") int userId);

    @Headers({ "Content-Type: application/json;charset=UTF-8"})
    @GET("post/get")
    Call<List<Project>> getProjects(@Query("id") int id, @Header("Authorization") String auth);

    @Headers({ "Content-Type: application/json;charset=UTF-8"})
    @POST("posts/add")
    Call<Project> createProject(@Body Project project, @Header("Authorization") String auth);

    @POST("auth/signup")
    Call<User> createUser(@Body User user);

    @POST("auth/login")
    Call<User> createUserLogin(@Body User user);
}
