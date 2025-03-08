package com.techbuds.util;

import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.MongoException;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Collections;

/**
 * Utility class for testing MongoDB connections
 * Run this as a standalone Java application to diagnose connection issues
 */
public class MongoDBConnectionTester {

    public static void main(String[] args) {
        // Test MongoDB Atlas connection
        System.out.println("=== Testing MongoDB Atlas Connection ===");
        testMongoDBAtlasConnection();
        
        // Test local MongoDB connection
        System.out.println("\n=== Testing Local MongoDB Connection ===");
        testLocalMongoDBConnection();
        
        // Test network connectivity
        System.out.println("\n=== Testing Network Connectivity ===");
        testNetworkConnectivity();
    }
    
    private static void testMongoDBAtlasConnection() {
        String connectionString = "mongodb+srv://root:ASDfgh1234@cluster0.7vhw3.mongodb.net/Splitx_Sport_Comunity";
        
        try {
            System.out.println("Attempting to connect to MongoDB Atlas...");
            MongoClient mongoClient = MongoClients.create(connectionString);
            MongoDatabase database = mongoClient.getDatabase("Splitx_Sport_Comunity");
            System.out.println("Successfully connected to MongoDB Atlas");
            System.out.println("Database name: " + database.getName());
            mongoClient.close();
        } catch (Exception e) {
            System.err.println("MongoDB Atlas connection failed: " + e.getMessage());
            e.printStackTrace();
            System.out.println("\nTroubleshooting tips for MongoDB Atlas:");
            System.out.println("1. Check your internet connection");
            System.out.println("2. Verify IP whitelist in MongoDB Atlas (add your current IP)");
            System.out.println("3. Confirm username and password are correct");
            System.out.println("4. Check if cluster is running in MongoDB Atlas dashboard");
        }
    }
    
    private static void testLocalMongoDBConnection() {
        try {
            System.out.println("Attempting to connect to local MongoDB...");
            MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
            MongoDatabase database = mongoClient.getDatabase("admin");
            System.out.println("Successfully connected to local MongoDB");
            System.out.println("Database exists: " + database.getName());
            mongoClient.close();
        } catch (Exception e) {
            System.err.println("Local MongoDB connection failed: " + e.getMessage());
            e.printStackTrace();
            System.out.println("\nTroubleshooting tips for local MongoDB:");
            System.out.println("1. Check if MongoDB service is running (use 'mongod' command or check system services)");
            System.out.println("2. Verify MongoDB is installed properly");
            System.out.println("3. Check if MongoDB is listening on default port 27017");
            System.out.println("4. Check firewall settings for port 27017");
        }
    }
    
    private static void testNetworkConnectivity() {
        // Test MongoDB Atlas connectivity
        try {
            System.out.println("Testing connectivity to MongoDB Atlas...");
            InetAddress address = InetAddress.getByName("cluster0.7vhw3.mongodb.net");
            boolean reachable = address.isReachable(5000);
            System.out.println("MongoDB Atlas host is reachable: " + reachable);
        } catch (UnknownHostException e) {
            System.err.println("Unable to resolve MongoDB Atlas hostname: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error testing connectivity: " + e.getMessage());
        }
        
        // Test localhost connectivity
        try {
            System.out.println("Testing connectivity to localhost MongoDB...");
            InetAddress address = InetAddress.getByName("localhost");
            boolean reachable = address.isReachable(1000);
            System.out.println("localhost is reachable: " + reachable);
            
            // Try to connect to MongoDB port
            try (java.net.Socket socket = new java.net.Socket()) {
                socket.connect(new java.net.InetSocketAddress("localhost", 27017), 1000);
                System.out.println("MongoDB port 27017 is open and accepting connections");
            } catch (java.io.IOException e) {
                System.err.println("Cannot connect to MongoDB port 27017: " + e.getMessage());
                System.out.println("This suggests MongoDB is not running or not listening on the default port");
            }
        } catch (Exception e) {
            System.err.println("Error testing local connectivity: " + e.getMessage());
        }
    }
}
