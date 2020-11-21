package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ProjectCreationActivity extends AppCompatActivity {
    Button next;
    AkademiseApi akademiseApi;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_creation);

        next = findViewById(R.id.btnPublicationCreation);
        next.setOnClickListener(btnNextClickListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                new ProjectInfoEntryFragment()).commit();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://jsonplaceholder.typicode.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        //getPosts();
        //createPost();

    }

    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            if(next.getText().equals(getString(R.string.next))){
                // TODO: get all the information typed

                getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                            new ProjectEntryFragment()).commit();

                next.setText(getString(R.string.done));
            }
            else if(next.getText().equals(getString(R.string.done))){

                // TODO: get the content
                finish();
                // TODO: add new element to the recycler view.
            }

        }
    };

    private  void getPosts(){

        Call<List<Post>> call= akademiseApi.getPosts();
        call.enqueue(new Callback<List<Post>>() {
            @Override
            public void onResponse(Call<List<Post>> call, Response<List<Post>> response) {

                if(!response.isSuccessful()){
                    Log.d("Post", "onResponse: not successful");
                    return;
                }

                List<Post> posts = response.body();
                int count=0;
                for (Post post : posts){
                    count++;
                }
                Log.d("Post", String.valueOf(count));
            }

            @Override
            public void onFailure(Call<List<Post>> call, Throwable t) {

                Log.d("Post", "onFailure: failed");

            }
        });

    }

    private void createPost(){
    Post post = new Post(22, "title", "text");
    Call<Post> call = akademiseApi.createPost(post);
    call.enqueue(new Callback<Post>() {
        @Override
        public void onResponse(Call<Post> call, Response<Post> response) {

            if(!response.isSuccessful()){
                Log.d("Post", "onResponse: not successful");
                return;
            }

            Log.d("Post", "onResponse: successful");
        }

        @Override
        public void onFailure(Call<Post> call, Throwable t) {
            Log.d("Post", "onFailure: failed");
        }
    });
    }

}