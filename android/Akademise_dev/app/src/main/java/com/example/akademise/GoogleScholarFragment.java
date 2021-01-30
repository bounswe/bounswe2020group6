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
    /*
    This fragment is to display a user's Google Scholar information.
     */
    //API
    AkademiseApi akademiseApi;
    //variables to access to the token of a logged in user.
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;

    //variables of xml file
    private TextView tvGoogleScholar;
    private TextView url_edit;
    private Button btnSend;
    private TextView total_citations;
    private RecyclerView recyclerView;
    private List<String> titles;
    private List<String> desc;
    //profile values of a user whose Google scholar is displayed will be in this variable
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
        //initialize retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        //load token data into myToken variable.
        loadData();
        //initialize API
        akademiseApi = retrofit.create(AkademiseApi.class);
        //initialize the xml variables
        tvGoogleScholar=view.findViewById(R.id.tvGoogleScholarUrl);
        url_edit=view.findViewById(R.id.etGS_Url);
        btnSend=view.findViewById(R.id.btnGS_Url);
        total_citations=view.findViewById(R.id.tvGS_Total_Citations_Number);
        recyclerView = view.findViewById(R.id.rv_GS_Project);
        //get profile values
        profile =(Profile)getArguments().getSerializable("profile");
        //set the xml variables
        total_citations.setText(profile.getCitations());
        titles = new ArrayList<>();
        desc = new ArrayList<>();
        //if the Google Scholar information is logged in user's info, then show the url edit part.
        //(User is looking at his/her own Google scholar)
        if(me()){
            //send new link on button click
            btnSend.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if(url_edit.getText().length()>0) { //if something typed, send
                        sendUrl(url_edit.getText().toString());
                    }

                }
            });

        }
        else{
            //looking at another user's google scholar
            tvGoogleScholar.setVisibility(View.INVISIBLE);
            url_edit.setVisibility(View.INVISIBLE);
            btnSend.setVisibility(View.INVISIBLE);

        }
        //get the titles and descriptions of Google Scholar publications into the lists titles and desc.
        readJSON();

        //initialize recyclerview
        GoogleScholarRVAdapter adapter = new GoogleScholarRVAdapter(getActivity(), titles,desc);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));


    }
    //if the profile info is logged in user's info, return true.
    //(says it is me)
    private boolean me() {
        return getArguments().getInt("other", 0) == 0;
    }

    //read json to get information of Google scholar publications
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
    //load token
    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
    //send new url to the backend
    private void sendUrl(String url){
        Url my_url = new Url(url); //create a new url class
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