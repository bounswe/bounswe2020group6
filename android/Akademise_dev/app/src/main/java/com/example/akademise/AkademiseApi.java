package com.example.akademise;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface AkademiseApi {

  /*  @Headers({
            "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA1NjIyMzkwfQ.5t4GG2JF-SJB-orXi25rQiaAdw-a27I9Fw_0-IVu8pk"
    })

   */
    @GET("posts") //relative path (/search?query=er&type=1)
    Call<List<Post>> getPostsSearched(@Query("userId") int userId);

    @GET("posts") //relative path (auth/post/add)
    Call<List<Post>> getPosts();

    @POST("posts")
    Call<Post> createPost(@Body Post post);

    @POST("auth/signup")
    Call<User> createUser(@Body User user);

    @POST("auth/login")
    Call<User> createUserLogin(@Body User user);
}
