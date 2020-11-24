package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ProfileFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private Button statsAndOverviewButton;
    private Button publicationsButton;
    private TextView tvAffiliation;
    private String myToken;
    private  Integer myId;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        statsAndOverviewButton = view.findViewById(R.id.stats_and_overview);
        publicationsButton = view.findViewById(R.id.projects);
        loadData();
        loadIDData();

        statsAndOverviewButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Fragment fragment = new StatsAndOverviewFragment();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.flFragment, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        publicationsButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Fragment fragment = new PublicationsFragment(); //
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.flFragment, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        return view;

    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        tvAffiliation = getView().findViewById(R.id.affiliation_content);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        getAffiliation();

    }

    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }
    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }

    private void getAffiliation(){

        Call<Affiliation> call = akademiseApi.getMyProfile(myId, "Bearer "+myToken);


        call.enqueue(new Callback<Affiliation>() {
            @Override
            public void onResponse(Call<Affiliation> call, Response<Affiliation> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                Affiliation affiliation = response.body();
                System.out.println("SUCCESSFUL");
                String str="";

                if(affiliation.getAffiliation() == null) return;

                str="University: "+ affiliation.getAffiliation().get("university")+"\n";


                str +="Department: "+ affiliation.getAffiliation().get("department")+"\n";


                str+= "Degree: " +affiliation.getAffiliation().get("degree");

                tvAffiliation.setText(str);

                //Toast.makeText(getActivity(), "Successful", Toast.LENGTH_LONG).show();


            }

            @Override
            public void onFailure(Call<Affiliation> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }
}