package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.ArrayList;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;
//recycler view for viewing contents(see search user's results to send an invite)

public class RecyclerViewAdapterInvite extends RecyclerView.Adapter<com.example.akademise.RecyclerViewAdapterInvite.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    public static final String accessID = "XXXXXID";
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-18-232-99-241.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;

    SearchedUsers searchedUsers;
    Context context;
    List<Integer> userId = new ArrayList<>();
    Integer projectId;

    //constructor for the adapter
    public RecyclerViewAdapterInvite(Context ct, SearchedUsers srchdUsr, Integer pId) {
        context = ct;
        loadData();
        loadIDData();
        //which project i am sending an invitation for
        projectId = pId;
        searchedUsers = srchdUsr;
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
    }

    private void loadData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    @NonNull
    @Override
    //customize the view holder
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.invite_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        loadIDData();
        //show user name, title
        String person = searchedUsers.getUsers().get(position).getName() + " " +
                searchedUsers.getUsers().get(position).getSurname();
        holder.title.setText(person);
        holder._abstract.setText(searchedUsers.getUsers().get(position).getTitle());
        userId.add(searchedUsers.getUsers().get(position).getId());

        holder.invite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //invite the yser
                invite(searchedUsers.getUsers().get(position).getId());


            }
        });


    }

    private void invite(Integer uId) {
        //first index is other users id, second is my id, third is project id, 0 means this is an invitation
        List<Integer> i = new ArrayList<Integer>() {{
            add(uId);
            add(myId);
            add(projectId);
            add(0);
        }};
        Invitation invitation = new Invitation(i);
//send the invitation
        Call<Invitation> call = akademiseApi.addInvitation(invitation, "Bearer " + myToken);
        call.enqueue(new Callback<Invitation>() {
            @Override
            public void onResponse(Call<Invitation> call, Response<Invitation> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(context, "WCouldnt send request. ", Toast.LENGTH_LONG).show();
                    return;
                }
                Invitation invResponse = response.body();
                Toast.makeText(context, "Invitation sent. ", Toast.LENGTH_LONG).show();

            }

            @Override
            public void onFailure(Call<Invitation> call, Throwable t) {
                Toast.makeText(context, "Be sure to be connected. ", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }

    //get how many contents in recycler view
    @Override
    public int getItemCount() {
        if (searchedUsers != null) {
            if (searchedUsers.getUsers() != null)
                return searchedUsers.getUsers().size();
            return 0;
        } else{
            return 0;}
    }

    public class ViewHolder extends RecyclerView.ViewHolder {


        TextView title;
        TextView _abstract;
        Button invite;
        View mView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.tv_title);
            _abstract = itemView.findViewById(R.id.tv_abstract);
            invite = itemView.findViewById(R.id.btnInvite);
            mView = itemView;
        }

    }

    //get my userıd
    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}




