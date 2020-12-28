package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class ProfileFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private Button statsAndOverviewButton;
    private Button publicationsButton;
    private Button logoutButton;

    private Button editButton;
    private Button updateButton;

    private Button googleScholar;
    private TextView tvAffiliation;

    private String myToken;
    private  Integer myId;
    private TextView tvName;
    private  TextView tvContact;
    private TextView tvTags;
    private TextView tvBiogprahy;
    private TextView tvUniversity;
    private TextView tvDepartment;
    private TextView tvTitle;
    private TextView tvUpvote;
    private ImageView ivProfilePhoto;
    long pressTime = 0;
    long lastPressTime = 0;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        statsAndOverviewButton = view.findViewById(R.id.stats_and_overview);
        publicationsButton = view.findViewById(R.id.projects);
        logoutButton =view.findViewById(R.id.logout_button);
        editButton = view.findViewById(R.id.edit_button);
        updateButton = view.findViewById(R.id.update_button);
        tvName = view.findViewById(R.id.name);
        tvContact=view.findViewById(R.id.contact_content);
        tvTags = view.findViewById(R.id.research_tags_content);
        tvBiogprahy = view.findViewById(R.id.biograpy_content);
        tvUniversity = view.findViewById(R.id.university_content);
        tvDepartment = view.findViewById(R.id.department_content);
        tvTitle = view.findViewById(R.id.title_content);
        ivProfilePhoto=view.findViewById(R.id.avatar);

        tvUpvote = view.findViewById(R.id.upvote_content);

        googleScholar = view.findViewById(R.id.btnMyGoogleScholar);

        loadData();
        loadIDData();

        editButton.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                changeTextsEditability(true);
                updateButton.setVisibility(View.VISIBLE);
            }
        });

        updateButton.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                updateButton.setVisibility(View.INVISIBLE);
                changeTextsEditability(false);

                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl(baseURL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();

                akademiseApi = retrofit.create(AkademiseApi.class);
                updateProfile();
            }
        });

        statsAndOverviewButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Fragment fragment = new StatsAndOverviewFragment();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.flProfileFragments, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        ivProfilePhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pressTime = System.currentTimeMillis();
                if(pressTime - lastPressTime <= ViewConfiguration.getDoubleTapTimeout()){
                    ivProfilePhoto.setImageResource(R.drawable.cactus);
                }

                lastPressTime = pressTime;
            }
        });

        publicationsButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Fragment fragment = new ProjectFragment(); //
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.flProfileFragments, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });


        logoutButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                deleteValidationData();
                Intent intent = new Intent(getActivity(), LoginActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
            }
        });

        return view;

    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //tvAffiliation = getView().findViewById(R.id.affiliation_content);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        getAffiliation();

    }

    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }
    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }

    private void getAffiliation(){

        Call<Profile> call = akademiseApi.getMyProfile(myId, "Bearer "+myToken);


        call.enqueue(new Callback<Profile>() {
            @Override
            public void onResponse(Call<Profile> call, Response<Profile> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                Profile profile = response.body();
                System.out.println("SUCCESSFUL");
                //String str="";


                //str = "University: "+ profile.getUniversity()+"\n";
                //str += "Department: "+ profile.getDepartment()+"\n";
                //str += "Title: " + profile.getTitle();

                String university = profile.getUniversity();
                String department = profile.getDepartment();
                String title = profile.getTitle();

                //tvAffiliation.setText(str);

                tvUniversity.setText(university);
                tvDepartment.setText(department);
                tvTitle.setText(title);
                tvName.setText(profile.getName()+" "+profile.getSurname());
                tvContact.setText(profile.getEmail());
                tvUpvote.setText(String.valueOf(profile.getUpCounts()));
                String temp="";
                for(int i=0; i<profile.getUser_interests().size(); i++){
                    temp+=profile.getUser_interests().get(i).getInterest()+",";
                }
                tvTags.setText(temp);
                //Toast.makeText(getActivity(), "Successful", Toast.LENGTH_LONG).show();

                googleScholar.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        goToGoogleScholar(profile);
                    }
                });


            }

            @Override
            public void onFailure(Call<Profile> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }


    private void deleteValidationData(){
        SharedPreferences preferences = this.getActivity().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.remove(accessToken);
        editor.apply();
    }

    private void changeTextsEditability(Boolean type){
        tvName.setFocusable(type);
        tvName.setFocusableInTouchMode(type);
        tvName.setClickable(type);
        tvBiogprahy.setFocusable(type);
        tvBiogprahy.setFocusableInTouchMode(type);
        tvBiogprahy.setClickable(type);
        tvTags.setFocusable(type);
        tvTags.setFocusableInTouchMode(type);
        tvTags.setClickable(type);
        tvUniversity.setFocusable(type);
        tvUniversity.setFocusableInTouchMode(type);
        tvUniversity.setClickable(type);
        tvDepartment.setFocusable(type);
        tvDepartment.setFocusableInTouchMode(type);
        tvDepartment.setClickable(type);
        tvTitle.setFocusable(type);
        tvTitle.setFocusableInTouchMode(type);
        tvTitle.setClickable(type);
    }

    private void updateProfile(){
        ArrayList<String> user_interests = new ArrayList<String>();
        String[] interests_split = tvTags.getText().toString().split(",");

        for (String s : interests_split) {
            user_interests.add(s);
        }
        for (String s : user_interests) {
            System.out.println(s);
        }
        Affiliation affiliation = new Affiliation(tvTitle.getText().toString(),
                tvUniversity.getText().toString(), tvDepartment.getText().toString());

        ProfileUpdate updatedProfile = new ProfileUpdate(user_interests, affiliation);
        Biography updateBio = new Biography(tvBiogprahy.getText().toString());
        

        Call<ProfileUpdate> call = akademiseApi.updateProfile(updatedProfile, "Bearer " + myToken);
        Call<Biography> callBio = akademiseApi.updateBio(updateBio, "Bearer" + myToken);


        call.enqueue(new Callback<ProfileUpdate>() {
            @Override
            public void onResponse(Call<ProfileUpdate> call, Response<ProfileUpdate> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    System.out.println("Response Message: " + response.message());
                    System.out.println("Error body: " + response.errorBody());
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                System.out.println("SUCCESSFUL");
            }

            @Override
            public void onFailure(Call<ProfileUpdate> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });

        callBio.enqueue(new Callback<Biography>() {
            @Override
            public void onResponse(Call<Biography> call, Response<Biography> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    System.out.println("Response Message: " + response.message());
                    System.out.println("Error body: " + response.errorBody());
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                System.out.println("SUCCESSFUL");
            }

            @Override
            public void onFailure(Call<Biography> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });


    private void goToGoogleScholar(Profile profile){
        Fragment fragment = new GoogleScholarFragment();
        Bundle args = new Bundle();
        args.putSerializable("profile", profile);
        fragment.setArguments(args);
        FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.flProfileFragments, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();

    }
}



