package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class GoogleScholarFragment extends Fragment {

    AkademiseApi akademiseApi;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;
    private TextView tvGoogleScholar;
    private TextView url_edit;
    private Button btnSend;
    private TextView total_citations;
    private RecyclerView recyclerView;
    private List<String> titles;
    private List<String> desc;


    Profile profile;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_google_scholar, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://ec2-52-91-31-85.compute-1.amazonaws.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        loadData();
        akademiseApi = retrofit.create(AkademiseApi.class);
        tvGoogleScholar=view.findViewById(R.id.tvGoogleScholarUrl);
        url_edit=view.findViewById(R.id.etGS_Url);
        btnSend=view.findViewById(R.id.btnGS_Url);
        total_citations=view.findViewById(R.id.tvGS_Total_Citations_Number);
        recyclerView = view.findViewById(R.id.rv_GS_Project);
        profile =(Profile)getArguments().getSerializable("profile");
        total_citations.setText(profile.getCitations());
        titles = new ArrayList<>();
        desc = new ArrayList<>();
        if(me()){
            btnSend.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if(url_edit.getText().length()>0) {
                        sendUrl(url_edit.getText().toString());
                    }

                }
            });

        }
        else{
            tvGoogleScholar.setVisibility(View.INVISIBLE);
            url_edit.setVisibility(View.INVISIBLE);
            btnSend.setVisibility(View.INVISIBLE);

        }

        readJSON();

        GoogleScholarRVAdapter adapter = new GoogleScholarRVAdapter(getActivity(), titles,desc);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));


        //tvGoogleScholar.setText(profile.getScholar_profile_url());

    }
    private boolean me() {
        return getArguments().getInt("other", 0) == 0;
    }

    public void readJSON(){
        final JSONObject obj;
        try {
            if(profile.getProjects()!=null){
            JSONArray array=new JSONArray(profile.getProjects());
        final int n = array.length();
        for (int i = 0; i < n; ++i) {
            final JSONObject person = array.getJSONObject(i);
            titles.add((person.getString("title")));
            desc.add((person.getString("venue")));
        }
        }
        } catch (JSONException e) {
            //e.printStackTrace();
        }
    }
    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
    private void sendUrl(String url){
        Url my_url = new Url(url);
        Call<GoogleScholar> inside_call= akademiseApi.getGoogleScholar(my_url,"Bearer " + myToken);
        inside_call.enqueue(new Callback<GoogleScholar>() {
            @Override
            public void onResponse(Call<GoogleScholar> call, Response<GoogleScholar> response) {
                if(!response.isSuccessful()){
                    Log.d("Get", "onResponse: " + response.code());
                    return;
                }
                Log.d("GET", "On response: " + response.message());
                GoogleScholar googleScholar = response.body();

            }

            @Override
            public void onFailure(Call<GoogleScholar> call, Throwable t) {
                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });
    }

}