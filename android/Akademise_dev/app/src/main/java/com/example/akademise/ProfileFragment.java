package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
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

import java.io.InputStream;
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
    /*
    This class to display logged in user's profile
     */
    //variables for token
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    //variables for id
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    //API
    AkademiseApi akademiseApi;

    private String myToken;
    private Integer myId;
    //xml variables
    private Button statsAndOverviewButton;
    private Button publicationsButton;
    private Button logoutButton;
    private Button editButton;
    private Button invitationButton;
    private Button updateButton;
    private Button googleScholar;
    private TextView tvName;
    private TextView tvContact;
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
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        //initialize the xml variables
        statsAndOverviewButton = view.findViewById(R.id.stats_and_overview);
        publicationsButton = view.findViewById(R.id.projects);
        logoutButton = view.findViewById(R.id.logout_button);
        editButton = view.findViewById(R.id.edit_button);
        updateButton = view.findViewById(R.id.update_button);
        tvName = view.findViewById(R.id.name);
        tvContact = view.findViewById(R.id.contact_content);
        tvTags = view.findViewById(R.id.research_tags_content);
        tvBiogprahy = view.findViewById(R.id.biograpy_content);
        tvUniversity = view.findViewById(R.id.university_content);
        tvDepartment = view.findViewById(R.id.department_content);
        tvTitle = view.findViewById(R.id.title_content);
        ivProfilePhoto = view.findViewById(R.id.avatar);
        invitationButton = view.findViewById(R.id.invitations_btn);
        tvUpvote = view.findViewById(R.id.upvote_content);

        googleScholar = view.findViewById(R.id.btnMyGoogleScholar);
        //load id
        loadIDData();
        //load token
        loadData();
        //edit button on click listener
        editButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                changeTextsEditability(true);
                //set update button as visible
                updateButton.setVisibility(View.VISIBLE);
            }
        });
        //update on click listener
        updateButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                updateButton.setVisibility(View.INVISIBLE);
                changeTextsEditability(false);
                //initialize retrofit
                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl(getString(R.string.baseUrl))
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
                //initialize API
                akademiseApi = retrofit.create(AkademiseApi.class);
                //update profile according to changed fields
                updateProfile();
            }
        });
        //go to stats and overview page
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

        //go to projects page
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
        //go to invitation page
        invitationButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(),ReceivedInvitationsActivity.class);
                startActivity(intent);
            }
        });

        //logout
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
        //Initialize Retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        //Initialize API
        akademiseApi = retrofit.create(AkademiseApi.class);
        //get user affiliation data
        getAffiliation();

    }
    //load token
    private void loadData() {
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }
    //load id
    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }
    //get user affiliation data
    private void getAffiliation() {

        Call<Profile> call = akademiseApi.getMyProfile(myId, "Bearer " + myToken);


        call.enqueue(new Callback<Profile>() {
            @Override
            public void onResponse(Call<Profile> call, Response<Profile> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                Profile profile = response.body();
                System.out.println("SUCCESSFUL");
                //fill the xml variables according to profile data
                String university = profile.getUniversity();
                String department = profile.getDepartment();
                String title = profile.getTitle();

                tvUniversity.setText(university);
                tvDepartment.setText(department);
                tvTitle.setText(title);
                tvName.setText(profile.getName() + " " + profile.getSurname());
                tvContact.setText(profile.getEmail());
                tvUpvote.setText(String.valueOf(profile.getUpCounts()));
                tvBiogprahy.setText(profile.getBio());
                new DownloadImageTask(ivProfilePhoto)
                        .execute(profile.getProfile_picture_url());
                String temp = "";
                for (int i = 0; i < profile.getUser_interests().size(); i++) {
                    temp += profile.getUser_interests().get(i).getInterest() + ",";
                }
                tvTags.setText(temp);
                //fo to google scholar
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

    //when logging out, delete token
    private void deleteValidationData() {
        SharedPreferences preferences = this.getActivity().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.remove(accessToken);
        editor.apply();
    }
    //when editing change it to true, after that change it to false
    private void changeTextsEditability(Boolean type) {
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
    //update profile according to the changes
    private void updateProfile() {
        ArrayList<String> user_interests = new ArrayList<String>();
        String[] interests_split = tvTags.getText().toString().split(",");
        //get changes
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

        //send changes to backend
        Call<ProfileUpdate> call = akademiseApi.updateProfile(updatedProfile, "Bearer " + myToken);
        Call<Biography> callBio = akademiseApi.updateBio(updateBio, "Bearer " + myToken);


        call.enqueue(new Callback<ProfileUpdate>() {
            @Override
            public void onResponse(Call<ProfileUpdate> call, Response<ProfileUpdate> response) {
                if (!response.isSuccessful()) {
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
                if (!response.isSuccessful()) {
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
    }
    //go to google scholar and send the profile i nfo to that page
    private void goToGoogleScholar(Profile profile) {
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
    //download profile photo
    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return mIcon11;
        }

        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }
    }

}



