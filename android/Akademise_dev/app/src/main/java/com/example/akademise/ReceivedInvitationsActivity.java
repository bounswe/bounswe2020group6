package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.util.ArrayList;
import java.util.List;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ReceivedInvitationsActivity extends AppCompatActivity {


    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    private Integer projectId;
    RecyclerView recyclerView;
    List<Request> requests;

    //set the layout
    //init retrofit and api object

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_received_inv);
        loadData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadIDData();
        getRequests(projectId);

    }


    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    //get received invitations
    private void getRequests(Integer projectId) {
        List<Request> mod_req = new ArrayList<Request>();
        Call<List<Request>> call = akademiseApi.getRequests("Bearer " + myToken);
        call.enqueue(new Callback<List<Request>>() {
            @Override
            public void onResponse(Call<List<Request>> call, Response<List<Request>> response) {

                if (!response.isSuccessful()) {
                    Log.d("Request", "onResponse: not successful");
                    return;
                }

                requests = response.body();

                //only see the invitations
                for (int i = 0; i < requests.size(); i++) {
                    Request req = requests.get(i);
                    if (req.getRequestType().equals(0)) {
                        mod_req.add(req);
                    }
                }
                //set the rv to have a scrollable and responsive list of requests
                recyclerView = findViewById(R.id.rv_recyclerView3);
                InviteAdapter recyclerViewAdapter = new InviteAdapter(ReceivedInvitationsActivity.this, mod_req);
                recyclerView.setLayoutManager(new LinearLayoutManager(ReceivedInvitationsActivity.this));
                recyclerView.setAdapter(recyclerViewAdapter);
            }

            @Override
            public void onFailure(Call<List<Request>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });


    }


    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }


}


