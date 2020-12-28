package com.example.akademise;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ProfileOthersFragment extends Fragment {

    AkademiseApi akademiseApi;
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;
    private Profile profile;
    private Button otherGoogleScholar;
    private TextView nameOthers;
    private TextView biograpyContentOthers;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile_others, container, false);
        profile =(Profile) getArguments().getSerializable("user");
        loadData();
        getData();
        return view;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        otherGoogleScholar = view.findViewById(R.id.btnOtherGoogleScholar);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        otherGoogleScholar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(profile!=null) {
                    goToGoogleScholar(profile);
                }
            }
        });

    }

    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    private void getData(){
        String test= this.getActivity().getIntent().getClass().toString();
        //Toast.makeText(this, test, Toast.LENGTH_LONG).show();
        if(this.getActivity().getIntent().hasExtra("user")){
            profile = (Profile) this.getActivity().getIntent().getSerializableExtra("user");
        }
        else{
            Toast.makeText(this.getActivity(), "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }
    private void goToGoogleScholar(Profile profile){
        Fragment fragment = new GoogleScholarFragment();
        Bundle args = new Bundle();
        args.putSerializable("profile", profile);
        args.putInt("other",1);
        fragment.setArguments(args);
        FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.flProfileFragments, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }
}