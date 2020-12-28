package com.example.akademise;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.Context;
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
    Profile profile;
    AkademiseApi akademiseApi;
    private Button statsAndOverviewButton;
    private Button publicationsButton;
    private Button logoutButton;
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
        statsAndOverviewButton = view.findViewById(R.id.stats_and_overview);
        publicationsButton = view.findViewById(R.id.projects);
        logoutButton =view.findViewById(R.id.logout_button);
        upvoteButton = view.findViewById(R.id.upvote_button);
        followButton = view.findViewById(R.id.follow_button);
        tvName = view.findViewById(R.id.name);
        tvContact=view.findViewById(R.id.contact_content);
        tvTags = view.findViewById(R.id.research_tags_content);
        tvBiogprahy = view.findViewById(R.id.biograpy_content);
        tvUniversity = view.findViewById(R.id.university_content);
        tvDepartment = view.findViewById(R.id.department_content);
        tvTitle = view.findViewById(R.id.title_content);
        ivProfilePhoto=view.findViewById(R.id.avatar);
        tvUpvote = view.findViewById(R.id.upvote_content);
        loadData();
        loadIDData();
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
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);


    }

    private void getProfileInfo(){
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
        String test= this.getActivity().getIntent().getClass().toString();
        //Toast.makeText(this, test, Toast.LENGTH_LONG).show();
        if(this.getActivity().getIntent().hasExtra("user")){
            profile = (Profile) this.getActivity().getIntent().getSerializableExtra("user");
            getProfileInfo();
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

    private void handleFollowCall(Boolean isFollow){
        Upvote follow = new Upvote(profile.getId());
        Call<Upvote> call;
        int currentNumofFollowers = profile.getFollowerCount();
        if(isFollow){
            call = akademiseApi.follow(follow, "Bearer " + myToken);
            currentNumofFollowers += 1;
        }else{
            call = akademiseApi.unfollow(follow, "Bearer " + myToken);
            currentNumofFollowers -= 1;
        }

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
}