package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static android.content.Context.MODE_PRIVATE;

public class PopUpAdapter extends RecyclerView.Adapter<PopUpAdapter.ViewHolder> {
    /*
    This adapter gets two lists and displays them in a recycler view.
    One of them is collaboration request and invitation list.
    The other one is notification list. (following, joining, accepting, rejecting ..)
     */
    //variables for id and token
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL ;
    public static final String accessID = "XXXXXID";
    //API
    AkademiseApi akademiseApi;

    Profile profile;
    List<Request> requests;
    List<Notifications> notifs;
    Context context;

    public PopUpAdapter(Context ct, List<Request> prj, List<Notifications> notif) {
        //get the parameters
        context = ct;
        requests = prj;
        notifs=notif;
        //reverse the lists so that last notification can be seen first.
        Collections.reverse(notifs);
        Collections.reverse(requests);
        //load token
        loadData();
        //load id
        loadIDData();
        baseURL=ct.getString(R.string.baseUrl);
        //initialize retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        //initialize API
        akademiseApi = retrofit.create(AkademiseApi.class);

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        //popup_row xml is used
        View view = inflater.inflate(R.layout.popup_row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        String user_name;
        //set the background color
        if(position%2==1){
            holder.username.setBackgroundColor(context.getResources().getColor( R.color.dark_green));
            holder.type.setBackgroundColor(context.getResources().getColor( R.color.dark_green));
            holder.projectName.setBackgroundColor(context.getResources().getColor( R.color.dark_green));

        }
        holder.username.setClickable(true);
        //if it is a notif element
        if(position<notifs.size()) {
            //if it is not a following notification (5- following)
            if (notifs.get(position).getType() != 5) {
                //set project name
                holder.projectName.setText("Project: " + notifs.get(position).getProject().getTitle());
                if (notifs.get(position).getType() == 0) {
                    //acceptation notification
                    user_name = notifs.get(position).getAccepter().getName() + " "
                            + notifs.get(position).getAccepter().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("accepted");
                }
                if (notifs.get(position).getType() == 1) {
                    //joining notification
                    user_name = notifs.get(position).getParticipant().getName() + " "
                            + notifs.get(position).getParticipant().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("joined");
                }
                if (notifs.get(position).getType() == 2) {
                    //removing notification
                    user_name = notifs.get(position).getParticipant().getName() + " "
                            + notifs.get(position).getParticipant().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("removed");
                }
                if (notifs.get(position).getType() == 3) {
                    //removing notification
                    user_name = notifs.get(position).getParticipant().getName() + " "
                            + notifs.get(position).getParticipant().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("removed");
                }
                if (notifs.get(position).getType() == -1) {
                    //rejection notification
                    user_name = notifs.get(position).getAccepter().getName() + " "
                            + notifs.get(position).getAccepter().getSurname();
                    holder.username.setText(user_name);
                    holder.type.setText("rejected");
                }
            } else {
                //following notification
                holder.projectName.setText("");
                user_name = notifs.get(position).getParticipant().getName() + " "
                        + notifs.get(position).getParticipant().getSurname();
                holder.username.setText(user_name);
                holder.type.setText("followed you");
            }
        }
        //collaboration requests and invitations
        else{
            //fill holder variable texts
            holder.projectName.setText(requests.get(position-notifs.size()).getProject().getTitle());
            user_name = requests.get(position-notifs.size()).getRequesterUser().get("name") + " "
                    + requests.get(position-notifs.size()).getRequesterUser().get("surname");
            holder.username.setText(user_name);
            //invitation
            if(requests.get(position-notifs.size()).getRequestType()==0){
                holder.type.setText("Invitation");
            }
            //request
            else{
                holder.type.setText("Request");
            }
        }
        //load id
        loadIDData();
        //if notification type is clicked, that notification is deleted. (Not collaboration requsets and invitations)
        holder.type.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (position < notifs.size()) {
                    Call<Notifications> call =akademiseApi.deleteNotification(notifs.get(position).getId(), "Bearer " + myToken);
                    call.enqueue(new Callback<Notifications>() {
                        @Override
                        public void onResponse(Call<Notifications> call, Response<Notifications> response) {
                            if (!response.isSuccessful()) {
                                return;
                            }
                        }

                        @Override
                        public void onFailure(Call<Notifications> call, Throwable t) {

                        }
                    });
                }
            }
        });
        //if name is clicked, that profile is opened
        holder.username.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //if clicked one is from notifs list
                if (position < notifs.size()) {
                    Call<Profile> call = akademiseApi.getMyProfile(notifs.get(position).getAccepterId(), "Bearer " + myToken);
                    call.enqueue(new Callback<Profile>() {
                        @Override
                        public void onResponse(Call<Profile> call, Response<Profile> response) {
                            if (!response.isSuccessful()) {
                                return;
                            }
                            profile = response.body();
                            Intent intent = new Intent(context, ProfileActivity.class);
                            intent.putExtra("user", profile);
                            context.startActivity(intent);

                        }

                        @Override
                        public void onFailure(Call<Profile> call, Throwable t) {
                        }
                    });
                }
                //if clicked one is from requests list
                else{
                    Call<Profile> call = akademiseApi.getMyProfile(requests.get(position-notifs.size()).getRequesterId(), "Bearer " + myToken);
                    call.enqueue(new Callback<Profile>() {
                        @Override
                        public void onResponse(Call<Profile> call, Response<Profile> response) {
                            if (!response.isSuccessful()) {
                                return;
                            }
                            profile = response.body();
                            Intent intent = new Intent(context, ProfileActivity.class);
                            intent.putExtra("user", profile);
                            context.startActivity(intent);

                        }

                        @Override
                        public void onFailure(Call<Profile> call, Throwable t) {
                        }
                    });
                }
            }

        });

    }

    //load token
    private void loadData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }


    @Override
    public int getItemCount() {
        //return the size of recycler view

        return notifs.size()+requests.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView username;
        TextView projectName;
        TextView type;
        View mView;


        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            //initialize the xml variables
            username = itemView.findViewById(R.id.tv_popup_user);
            projectName = itemView.findViewById(R.id.tv_popup_row_project_name);
            type = itemView.findViewById(R.id.tv_popup_req_inv);
            mView = itemView;


        }
    }
    //load id
    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}
