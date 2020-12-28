package com.example.akademise;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class ProfileOthersFragment extends Fragment {
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";

    AkademiseApi akademiseApi;
    private Profile profile;
    private List<GetProjects> projects;
    private Button otherGoogleScholar;
    private Button statsAndOverviewButton;
    private Button publicationsButton;
    private Button upvoteButton;
    private Button followButton;
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


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile_others, container, false);

        statsAndOverviewButton = view.findViewById(R.id.stats_and_overview_others);
        publicationsButton = view.findViewById(R.id.projects_others);
        upvoteButton = view.findViewById(R.id.upvote_button);
        followButton = view.findViewById(R.id.follow_button);
        tvName = view.findViewById(R.id.name_others);
        tvContact=view.findViewById(R.id.contact_content_others);
        tvTags = view.findViewById(R.id.research_tags_content_others);
        tvBiogprahy = view.findViewById(R.id.biography_content_others);
        tvUniversity = view.findViewById(R.id.university_content_others);
        tvDepartment = view.findViewById(R.id.department_content_others);
        tvTitle = view.findViewById(R.id.title_content_others);
        ivProfilePhoto=view.findViewById(R.id.avatar_others);
        tvUpvote = view.findViewById(R.id.upvote_content_others);

        loadData();
        loadIDData();
        otherGoogleScholar = view.findViewById(R.id.btnOtherGoogleScholar);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        getData();

        upvoteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(upvoteButton.getText().equals("UPVOTE")){
                    upvoteButton.setText("DOWNVOTE");
                    handleUpvoteCall(true);
                }else{
                    upvoteButton.setText("UPVOTE");
                    handleUpvoteCall(false);
                }
            }
        });

        followButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(followButton.getText().equals("FOLLOW")){
                    followButton.setText("UNFOLLOW");
                    handleFollowCall(true);
                }else{
                    followButton.setText("FOLLOW");
                    handleFollowCall(false);
                }
            }
        });

        return view;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


    }

    private void getProfileInfo(){
        String university = profile.getUniversity();
        String department = profile.getDepartment();
        String title = profile.getTitle();


        tvUniversity.setText(university);
        tvDepartment.setText(department);
        tvTitle.setText(title);
        tvName.setText(profile.getName()+" "+profile.getSurname());
        tvContact.setText(profile.getEmail());
        tvUpvote.setText(String.valueOf(profile.getUpCounts()));
        tvBiogprahy.setText(profile.getBio());
        String temp="";
        for(int i=0; i<profile.getUser_interests().size(); i++){
            temp+=profile.getUser_interests().get(i).getInterest()+",";
        }
        tvTags.setText(temp);

        if(profile.getCanFollow()){
            followButton.setText("FOLLOW");
        }else{
            followButton.setText("UNFOLLOW");
        }

        if(profile.getIsUpped()){
            upvoteButton.setText("DOWNVOTE");
        }else{
            upvoteButton.setText("UPVOTE");
        }

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
    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }

    private void getData(){
        if(this.getActivity().getIntent().hasExtra("user")){
            profile = (Profile) this.getActivity().getIntent().getSerializableExtra("user");
            Call<Profile> call = akademiseApi.getMyProfile(profile.getId(), "Bearer "+myToken);

            call.enqueue(new Callback<Profile>() {
                @Override
                public void onResponse(Call<Profile> call, Response<Profile> response) {
                    if(!response.isSuccessful()){
                        System.out.println("NOT SUCCESSFUL");
                        Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                        return;
                    }
                    profile = response.body();
                    System.out.println("SUCCESSFUL");

                    getProfileInfo();

                    publicationsButton.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            Intent intent = new Intent(getContext(), OtherUserProjectsActivity.class);
                            intent.putExtra("userId", profile.getId());
                            getContext().startActivity(intent);
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
        else{
            Toast.makeText(this.getActivity(), "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }

    private void handleUpvoteCall(Boolean isUpvote){
        Call<Upvote> call;
        Upvote upvote = new Upvote(profile.getId());
        int currentUpvote = Integer.parseInt(tvUpvote.getText().toString());
        if(isUpvote){
            call = akademiseApi.addUp(upvote, "Bearer " + myToken);
            currentUpvote += 1;
        }else{
            call = akademiseApi.removeUp(upvote, "Bearer " + myToken);
            currentUpvote -= 1;
        }
        tvUpvote.setText(String.valueOf(currentUpvote));
        call.enqueue(new Callback<Upvote>() {
            @Override
            public void onResponse(Call<Upvote> call, Response<Upvote> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                System.out.println("SUCCESSFUL");
            }

            @Override
            public void onFailure(Call<Upvote> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }

    private void handleFollowCall(Boolean isFollow) {
        Upvote follow = new Upvote(profile.getId());
        Call<Upvote> call;
        int currentNumofFollowers = profile.getFollowerCount();
        if (isFollow) {
            call = akademiseApi.follow(follow, "Bearer " + myToken);
            currentNumofFollowers += 1;
        } else {
            call = akademiseApi.unfollow(follow, "Bearer " + myToken);
            currentNumofFollowers -= 1;
        }

        call.enqueue(new Callback<Upvote>() {
            @Override
            public void onResponse(Call<Upvote> call, Response<Upvote> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                System.out.println("SUCCESSFUL");
            }

            @Override
            public void onFailure(Call<Upvote> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
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